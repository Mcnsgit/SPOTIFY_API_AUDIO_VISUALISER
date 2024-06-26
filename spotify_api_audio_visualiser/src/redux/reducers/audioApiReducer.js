
const initialState = {
  audioAnalysis: null,
  audioFeatures: null
};
export const audioApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_AUDIO_ANALYSIS_SUCCESS':
      return {
        ...state,
        audioAnalysis: action.analysis
      };
    case 'FETCH_AUDIO_ANALYSIS_ERROR':
      return {
        ...state,
        audioAnalysis: null
      };
    case 'FETCH_AUDIO_ANALYSIS_PENDING':
      return {
        ...state,
        audioAnalysis: null
      };
    case 'FETCH_AUDIO_FEATURES_SUCCESS':
      return {
        ...state,
        audioFeatures: action.features
      };
    case 'FETCH_AUDIO_FEATURES_ERROR':
      return {
        ...state,
        audioFeatures: null
      };
    case 'FETCH_AUDIO_FEATURES_PENDING':
      return {
        ...state,
        audioFeatures: null
      };
    default:
      return state;
  }
};