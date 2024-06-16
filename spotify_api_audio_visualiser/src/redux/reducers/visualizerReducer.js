const initialState = {
  isActive: false,
  settings: {
    shape: 'box',
    mesh: 'sphere',
    colorScheme: 'default',
    barCount: 50,
    sensitivity: 1.0,
  },
  error: null,
};

const visualizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_VISUALIZER':
      return {
        ...state,
        isActive: !state.isActive,
      };
    case 'SET_VISUALIZER_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    case 'VISUALIZER_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default visualizerReducer;
