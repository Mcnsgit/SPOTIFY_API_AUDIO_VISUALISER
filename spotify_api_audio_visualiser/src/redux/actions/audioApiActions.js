import axios from '../../utils/axios';

export const fetchAudioAnalysisSuccess = analysis => {
        return {
            type: 'FETCH_AUDIO_ANALYSIS_SUCCESS',
            analysis
        };
    };

export const fetchAudioAnalysisError = () => {
    return {
        type: 'FETCH_AUDIO_ANALYSIS_ERROR'
    };
};

export const fetchAudioAnalysisPending = () => {
    return {
        type: 'FETCH_AUDIO_ANALYSIS_PENDING'
    };
}
export const getAudioAnalysis = id => {
    return async dispatch => {
      dispatch(fetchAudioAnalysisPending());
      try {
        const analysis = await axios.get(`/audio-analysis/${id}`);
        dispatch(fetchAudioAnalysisSuccess(analysis.data));
      } catch (error) {
        dispatch(fetchAudioAnalysisError());
        return error;
      }
    };
  } 
  
  export const fetchAudioFeaturesSuccess = features => {
    return {
      type: 'FETCH_AUDIO_FEATURES_SUCCESS',
      features
    };
  };
  
  export const fetchAudioFeaturesError = () => {
    return {
      type: 'FETCH_AUDIO_FEATURES_ERROR'
    };
  };
  
  export const fetchAudioFeaturesPending = () => {
    return {
      type: 'FETCH_AUDIO_FEATURES_PENDING'
    };
  };
  
  export const getAudioFeatures = id => {
    return async dispatch => {
      dispatch(fetchAudioFeaturesPending());
      try { 
        const features = await axios.get(`/audio-features/${id}`);
        dispatch(fetchAudioFeaturesSuccess(features.data));
      } catch (error) {
        dispatch(fetchAudioFeaturesError());
        return error;
      }
    };
  }