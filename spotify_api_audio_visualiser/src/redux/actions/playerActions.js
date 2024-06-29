import axios from "../../utils/axios";

export const setStatus = status => {
	return {
		type: "FETCH_STATUS_SUCCESS",
		status
	};
};

export const nextTrack = () => {
	axios.post("/me/player/next");
	return {
		type: "CHANGE_SONG"
	};
};

export const previousTrack = () => {
	axios.post("/me/player/previous");
	return {
		type: "CHANGE_SONG"
	};
};

export const playTrack = (context = false, offset) => {
	if (context && offset) {
		axios.put("/me/player/play", {
			context_uri: context,
			offset: { position: offset }
		});
	} else {
		if (context) {
			axios.put("/me/player/play", {
				context_uri: context
			});
		} else {
			axios.put("/me/player/play");
		}
	}
	return {
		type: "PLAY_STATE"
	};
};

export const playTracks = (tracks, offset) => {
	axios.put("/me/player/play", {
		uris: tracks,
		offset: { position: offset }
	});
	return {
		type: "PLAY_STATE"
	};
};

export const pauseTrack = () => {
	axios.put("/me/player/pause");
	return {
		type: "PAUSE_STATE"
	};
};

export const seekTrack = ms => {
	axios.put(`/me/player/seek?position_ms=${ms}`);
	return {
		type: "SEEK_SONG"
	};
};

export const repeatContext = status => {
	axios.put(`/me/player/repeat?state=${status}`);
	return {
		type: "REPEAT"
	};
};

export const shuffle = status => {
	axios.put(`/me/player/shuffle?state=${status}`);
	return {
		type: "Shuffle"
	};
};

export const setVolume = volume => {
	axios.put(`/me/player/volume?volume_percent=${volume}`);
	return {
		type: "SET_VOLUME"
	};
};

export const setDeviceId = id => {
	return {
		type: "SET_DEVICE_ID",
		id
	};  
};
