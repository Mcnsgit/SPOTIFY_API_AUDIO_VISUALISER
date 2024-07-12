import { useState, useEffect, useRef, useCallback } from 'react';
import Observe from '../../../../utils/observe';
import * as cookies from '../../../../utils/cookie';
import { get } from '../../../../utils/network';
import interpolate from '../../../../utils/interpolate';
import { scaleLog } from 'd3-scale';
import { min } from 'd3-array';
import ease from '../../../../utils/easing';

/**
 * @component Sync
 * 
 * Creates an interface for analyzing a playing Spotify track in real time.
 * Exposes event hooks for reacting to changes in intervals. 
 */
export default function Sync({
  volumeSmoothing = 100,
  pingDelay = 2500
} = {}) {
  const accessToken = cookies.get('SPOTIFY_ACCESS_TOKEN');
  const refreshToken = cookies.get('SPOTIFY_REFRESH_TOKEN');
  const refreshCode = cookies.get('SPOTIFY_REFRESH_CODE');

  const [state, setState] = useState({
    api: {
      currentlyPlaying: 'https://api.spotify.com/v1/me/player',
      trackAnalysis: 'https://api.spotify.com/v1/audio-analysis/',
      trackFeatures: 'https://api.spotify.com/v1/audio-features/',
      tokens: {
        accessToken,
        refreshToken,
        refreshCode
      },
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Accept': 'application/json'
      },
      pingDelay
    },
    intervalTypes: ['tatums', 'segments', 'beats', 'bars', 'sections'],
    activeIntervals: Observe({
      tatums: {},
      segments: {},
      beats: {},
      bars: {},
      sections: {}
    }),
    currentlyPlaying: {},
    trackAnalysis: {},
    trackFeatures: {},
    initialTrackProgress: 0,
    initialStart: 0,
    trackProgress: 0,
    active: false,
    initialized: false,
    volumeSmoothing,
    volume: 0,
    queues: {
      volume: [],
      beat: []
    }
  });

  const hooks = useRef({
    tatum: () => {},
    segment: () => {},
    beat: () => {},
    bar: () => {},
    section: () => {}
  }).current;

  const tickRef = useRef(null);

  useEffect(() => {
    initHooks();
    ping();
    return () => cancelAnimationFrame(tickRef.current); // Cleanup
  }, []);

  const initHooks = useCallback(() => {
    state.activeIntervals.watch('tatums', t => hooks.tatum(t));
    state.activeIntervals.watch('segments', s => hooks.segment(s));
    state.activeIntervals.watch('beats', b => hooks.beat(b));
    state.activeIntervals.watch('bars', b => hooks.bar(b));
    state.activeIntervals.watch('sections', s => hooks.section(s));
  }, [state.activeIntervals, hooks]);

  const ping = useCallback(() => {
    setTimeout(() => getCurrentlyPlaying(), state.api.pingDelay);
  }, [state.api.pingDelay]);

  const getNewToken = useCallback(async () => {
    const { data } = await get(`http://localhost:8001/refresh?token=${state.api.tokens.refreshToken}`);
    cookies.set('KALEIDOSYNC_ACCESS_TOKEN', data.access_token);
    setState(prevState => ({
      ...prevState,
      api: {
        ...prevState.api,
        tokens: {
          ...prevState.api.tokens,
          accessToken: data.access_token
        },
        headers: {
          'Authorization': 'Bearer ' + data.access_token,
          'Accept': 'application/json'
        }
      }
    }));
    ping();
  }, [state.api.tokens.refreshToken, ping]);

  const getCurrentlyPlaying = useCallback(async () => {
    try {
      const { data } = await get(state.api.currentlyPlaying, { headers: state.api.headers });
      if (!data || !data.is_playing) {
        if (state.active) {
          setState(prevState => ({ ...prevState, active: false }));
        }
        return ping();
      }

      processResponse(data);
    } catch (error) {
      if (error.status === 401) {
        return getNewToken();
      }
    }
  }, [state.api.currentlyPlaying, state.api.headers, state.active, ping, getNewToken]);

  const processResponse = useCallback((data) => {
    const songsInSync = (JSON.stringify(data.item) === JSON.stringify(state.currentlyPlaying));

    if (!state.initialized || !songsInSync || !state.active) {
      return getTrackInfo(data);
    }

    ping();
  }, [state.currentlyPlaying, state.initialized, state.active, ping]);

  const getTrackInfo = useCallback(async (data) => {
    const tick = window.performance.now();
    const [analysis, features] = await Promise.all([
      get(state.api.trackAnalysis + data.item.id, { headers: state.api.headers }).then(res => res.data),
      get(state.api.trackFeatures + data.item.id, { headers: state.api.headers }).then(res => res.data)
    ]);

    state.intervalTypes.forEach((t) => {
      const type = analysis[t];
      type[0].duration = type[0].start + type[0].duration;
      type[0].start = 0;
      type[type.length - 1].duration = (data.item.duration_ms / 1000) - type[type.length - 1].start;
      type.forEach((interval) => {
        if (interval.loudness_max_time) {
          interval.loudness_max_time = interval.loudness_max_time * 1000;
        }
        interval.start = interval.start * 1000;
        interval.duration = interval.duration * 1000;
      });
    });

    const tock = window.performance.now() - tick;

    setState(prevState => ({
      ...prevState,
      currentlyPlaying: data.item,
      trackAnalysis: analysis,
      trackFeatures: features,
      initialTrackProgress: data.progress_ms + tock,
      trackProgress: data.progress_ms + tock,
      initialStart: window.performance.now(),
      initialized: prevState.initialized || true,
      active: prevState.active || true
    }));

    if (!state.initialized) {
      requestAnimationFrame(tickRef.current);
    }

    ping();
  }, [state.api.trackAnalysis, state.api.trackFeatures, state.api.headers, state.intervalTypes, ping]);

  const setActiveIntervals = useCallback(() => {
    const determineInterval = (type) => {
      const analysis = state.trackAnalysis[type];
      const progress = state.trackProgress;
      for (let i = 0; i < analysis.length; i++) {
        if (i === (analysis.length - 1)) return i;
        if (analysis[i].start < progress && progress < analysis[i + 1].start) return i;
      }
    }

    state.intervalTypes.forEach(type => {
      const index = determineInterval(type);
      if (!state.activeIntervals[type].start || index !== state.activeIntervals[type].index) {
        state.activeIntervals[type] = { ...state.trackAnalysis[type][index], index };
      }

      const { start, duration } = state.activeIntervals[type];
      const elapsed = state.trackProgress - start;
      state.activeIntervals[type].elapsed = elapsed;
      state.activeIntervals[type].progress = ease(elapsed / duration);
    });
  }, [state.trackAnalysis, state.trackProgress, state.intervalTypes, state.activeIntervals]);

  const getVolume = useCallback(() => {
    const {
      loudness_max,
      loudness_start,
      loudness_max_time,
      duration,
      elapsed,
      start,
      index
    } = state.activeIntervals.segments;

    if (!state.trackAnalysis.segments[index + 1]) return 0;

    const next = state.trackAnalysis.segments[index + 1].loudness_start;
    const current = start + elapsed;

    if (elapsed < loudness_max_time) {
      const progress = Math.min(1, elapsed / loudness_max_time);
      return interpolate(loudness_start, loudness_max)(progress);
    } else {
      const _start = start + loudness_max_time;
      const _elapsed = current - _start;
      const _duration = duration - loudness_max_time;
      const progress = Math.min(1, _elapsed / _duration);
      return interpolate(loudness_max, next)(progress);
    }
  }, [state.activeIntervals.segments, state.trackAnalysis.segments]);

  const tick = useCallback((now) => {
    requestAnimationFrame(tick);

    if (!state.active) return;

    setState(prevState => ({
      ...prevState,
      trackProgress: (now - prevState.initialStart) + prevState.initialTrackProgress
    }));

    setActiveIntervals();

    const volume = getVolume();
    const queues = state.queues;

    queues.volume.unshift(volume);

    if (queues.volume.length > 400) {
      queues.volume.pop();
    }

    queues.beat.unshift(volume);

    if (queues.beat.length > state.volumeSmoothing) {
      queues.beat.pop();
    }

    function average(arr) {
      return arr.reduce((a, b) => (a + b)) / arr.length;
    }

    const sizeScale = scaleLog()
      .domain([min(queues.volume), average(queues.volume)])
      .range([0, 1]);

    const beat = average(queues.beat);
    state.volume = sizeScale(beat);
  }, [state.active, state.initialStart, state.initialTrackProgress, setActiveIntervals, getVolume, state.queues, state.volumeSmoothing]);

  tickRef.current = tick;

  const watch = useCallback((key, method) => {
    state.watch(key, method);
  }, [state]);

  const on = useCallback((interval, method) => {
    hooks[interval] = method;
  }, [hooks]);

  const isActive = state.active === true;

  const getInterval = useCallback((type) => {
    return state.activeIntervals[type + 's'];
  }, [state.activeIntervals]);

  return (
    <div>
      {isActive && <div>Sync is active</div>}
      {/* Additional UI elements can be added here */}
    </div>
  );
}

export async function auth() {
  try {
    const { data } = await axios.get('http://localhost:3000/auth');
    window.location.href = `http://localhost:3000/login?auth_id=${data.auth_id}`;
  } catch (error) {
    console.error(error);
  }
}
