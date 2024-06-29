// audioReducer.js
import {
	FETCH_AUDIO_API_ANALYSIS_SUCCESS,
	FETCH_AUDIO_API_ANALYSIS_ERROR,
	FETCH_AUDIO_API_ANALYSIS_PENDING,
	FETCH_AUDIO_API_FEATURES_SUCCESS,
	FETCH_AUDIO_API_FEATURES_ERROR,
	FETCH_AUDIO_API_FEATURES_PENDING,
	FETCH_MULTIPLE_AUDIO_API_FEATURES_SUCCESS,
	FETCH_MULTIPLE_AUDIO_API_FEATURES_ERROR,
	FETCH_MULTIPLE_AUDIO_API_FEATURES_PENDING
} from "../actions/audioApiActions";

const initialState = {
	audioApiAnalysis: null,
	audioApiAnalysisLoading: false,
	audioApiAnalysisError: null,
	audioApiFeatures: null,
	audioApiFeaturesLoading: false,
	audioApiFeaturesError: null,
	multipleAudioApiFeatures: null,
	multipleAudioApiFeaturesLoading: false,
	multipleAudioApiFeaturesError: null
};

const audioApiReducer = (state = initialState, action) => {
	switch (action.type) {
	case FETCH_AUDIO_API_ANALYSIS_PENDING:
		return { ...state, audioApiAnalysisLoading: true };
	case FETCH_AUDIO_API_ANALYSIS_SUCCESS:
		return { ...state, audioApiAnalysisLoading: false, audioApiAnalysis: action.analysis };
	case FETCH_AUDIO_API_ANALYSIS_ERROR:
		return { ...state, audioApiAnalysisLoading: false, audioApiAnalysisError: action.error };
	case FETCH_AUDIO_API_FEATURES_PENDING:
		return { ...state, audioApiFeaturesLoading: true };
	case FETCH_AUDIO_API_FEATURES_SUCCESS:
		return { ...state, audioApiFeaturesLoading: false, audioApiFeatures: action.features };
	case FETCH_AUDIO_API_FEATURES_ERROR:
		return { ...state, audioApiFeaturesLoading: false, audioApiFeaturesError: action.error };
	case FETCH_MULTIPLE_AUDIO_API_FEATURES_PENDING:
		return { ...state, multipleAudioApiFeaturesLoading: true };
	case FETCH_MULTIPLE_AUDIO_API_FEATURES_SUCCESS:
		return { ...state, multipleAudioApiFeaturesLoading: false, multipleAudioApiFeatures: action.features };
	case FETCH_MULTIPLE_AUDIO_API_FEATURES_ERROR:
		return { ...state, multipleAudioApiFeaturesLoading: false, multipleAudioApiFeaturesError: action.error };
	default:
		return state;
	}
};

export default audioApiReducer;
