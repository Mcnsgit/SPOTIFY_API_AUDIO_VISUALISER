
  // actions/visualizerActions.js
  export const toggleVisualizer = () => ({
    type: 'TOGGLE_VISUALIZER',
  });
  
  export const setVisualizerSettings = (settings) => ({
    type: 'SET_VISUALIZER_SETTINGS',
    payload: { settings },
  });
  
  export const visualizerError = (error) => ({
    type: 'VISUALIZER_ERROR',
    payload: { error },
  });
  