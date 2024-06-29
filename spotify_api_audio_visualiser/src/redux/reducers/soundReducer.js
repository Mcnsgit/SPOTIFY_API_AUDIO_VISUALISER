const initialState = {
	volume: 100,
};

const soundReducer = (state = initialState, action) => {
	switch (action.type) {
	case "UPDATE_VOLUME":
		return {
			...state,
			volume: action.payload,
		};
	default:
		return state;
	}
};

export default soundReducer;
