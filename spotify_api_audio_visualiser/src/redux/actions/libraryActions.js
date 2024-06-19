import axios from '../../utils/axios';

const fetchTracksPending = () => {
  return {
    type: 'FETCH_TRACKS_PENDING'
  };
};

const fetchTracksSuccess = tracks => {
  return {
    type: 'FETCH_TRACKS_SUCCESS',
    tracks
  };
};

const fetchMoreSucess = (tracks, next) => {
  return {
    type: 'FETCH_MORE_TRACKS_SUCCESS',
    tracks,
    next
  };
};

const fetchTracksError = () => {
  return {
    type: 'FETCH_TRACKS_ERROR'
  };
};

const containsTrackSuccess = contains => {
  return {
    type: 'CONTAINS_CURRENT_SUCCESS',
    contains: contains
  };
};

export const removeTrack = (id, current = false) => {
  axios.delete(`/me/tracks?ids=${id}`);
  return {
    type: 'REMOVE_TRACK_SUCCESS',
    current: current
  };
};

export const addTrack = (id, current = false) => {
  axios.put(`/me/tracks?ids=${id}`);
  return {
    type: 'ADD_TRACK_SUCCESS',
    current: current
  };
};

export const containsCurrentTrack = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/me/tracks/contains?ids=${id}`);
      dispatch(containsTrackSuccess(response, true));
      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export const containsTrack = id => {
  return async () => {
    try {
      const response = await axios.get(`/me/tracks/contains?ids=${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };
};

export const fetchTracks = () => {
  return async dispatch => {
    dispatch(fetchTracksPending());
    try {
      const response = await axios.get('/me/tracks?limit=25');
      dispatch(fetchTracksSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchTracksError());
      return error;
    }
  };
};

const filterRepeatedTracks = (keyFn, array) => {
  var ids = [];
  return array.filter(x => {
    var key = keyFn(x),
      isNew = !ids.includes(key);
    if (isNew) ids.push(key);
    return isNew;
  });
};

export const fetchMoreTracks = () => {
  return async (dispatch, getState) => {
    const next = getState().libraryReducer.tracks.next;
    try {
      if (next) {
        const response = await axios.get(next);
        const tracks = await filterRepeatedTracks(
          x => x.track.id,
          response.data.items
        );
        dispatch(fetchMoreSucess(tracks, response.data.next));
        return tracks;
      }
    } catch (error) {
      dispatch(fetchTracksError());
      return error;
    }
  };
};

export const fetchRecentTracks = () => {
  return async dispatch => {
    dispatch(fetchTracksPending());
    try {
      const response = await axios.get('/me/player/recently-played');
      const tracks = await filterRepeatedTracks(
        x => x.track.id,
        response.data.items
      );
      dispatch(fetchTracksSuccess({ ...response.data, items: tracks }));
      return tracks;
    } catch (error) {
      dispatch(fetchTracksError());
      return error;
    }
  };
};
