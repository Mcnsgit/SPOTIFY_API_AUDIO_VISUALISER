import { getAudioApiAnalysis, getAudioApiFeatures, getMultipleAudioApiFeatures } from "../../api/spotify";


export const FETCH_AUDIO_API_ANALYSIS_SUCCESS = "FETCH_AUDIO_API_ANALYSIS_SUCCESS";
export const FETCH_AUDIO_API_ANALYSIS_ERROR = "FETCH_AUDIO_API_ANALYSIS_ERROR";
export const FETCH_AUDIO_API_ANALYSIS_PENDING = "FETCH_AUDIO_API_ANALYSIS_PENDING";
export const FETCH_AUDIO_API_FEATURES_SUCCESS = "FETCH_AUDIO_API_FEATURES_SUCCESS";
export const FETCH_AUDIO_API_FEATURES_ERROR = "FETCH_AUDIO_API_FEATURES_ERROR";
export const FETCH_AUDIO_API_FEATURES_PENDING = "FETCH_AUDIO_API_FEATURES_PENDING";
export const FETCH_MULTIPLE_AUDIO_API_FEATURES_SUCCESS = "FETCH_MULTIPLE_AUDIO_API_FEATURES_SUCCESS";
export const FETCH_MULTIPLE_AUDIO_API_FEATURES_ERROR = "FETCH_MULTIPLE_AUDIO_API_FEATURES_ERROR";
export const FETCH_MULTIPLE_AUDIO_API_FEATURES_PENDING = "FETCH_MULTIPLE_AUDIO_API_FEATURES_PENDING";

export const fetchAudioApiAnalysisSuccess = (analysis) => ({
	type: FETCH_AUDIO_API_ANALYSIS_SUCCESS,
	analysis
});

export const fetchAudioApiAnalysisError = () => ({
	type: FETCH_AUDIO_API_ANALYSIS_ERROR
});

export const fetchAudioApiAnalysisPending = () => ({
	type: FETCH_AUDIO_API_ANALYSIS_PENDING
});

export const fetchAudioApiFeaturesSuccess = (features) => ({
	type: FETCH_AUDIO_API_FEATURES_SUCCESS,
	features
});

export const fetchAudioApiFeaturesError = () => ({
	type: FETCH_AUDIO_API_FEATURES_ERROR
});

export const fetchAudioApiFeaturesPending = () => ({
	type: FETCH_AUDIO_API_FEATURES_PENDING
});

export const fetchMultipleAudioApiFeaturesSuccess = (features) => ({
	type: FETCH_MULTIPLE_AUDIO_API_FEATURES_SUCCESS,
	features
});

export const fetchMultipleAudioApiFeaturesError = () => ({
	type: FETCH_MULTIPLE_AUDIO_API_FEATURES_ERROR
});

export const fetchMultipleAudioApiFeaturesPending = () => ({
	type: FETCH_MULTIPLE_AUDIO_API_FEATURES_PENDING
});

// Thunk actions
export const getAudioApiAnalysisAction = (id) => {
	return async (dispatch) => {
		dispatch(fetchAudioApiAnalysisPending());
		try {
			const analysis = await getAudioApiAnalysis(id);
			dispatch(fetchAudioApiAnalysisSuccess(analysis));
		} catch (error) {
			dispatch(fetchAudioApiAnalysisError());
		}
	};
};

export const getAudioApiFeaturesAction = (id) => {
	return async (dispatch) => {
		dispatch(fetchAudioApiFeaturesPending());
		try {
			const features = await getAudioApiFeatures(id);
			dispatch(fetchAudioApiFeaturesSuccess(features));
		} catch (error) {
			dispatch(fetchAudioApiFeaturesError());
		}
	};
};

export const getMultipleAudioApiFeaturesAction = (ids) => {
	return async (dispatch) => {
		dispatch(fetchMultipleAudioApiFeaturesPending());
		try {
			const features = await getMultipleAudioApiFeatures(ids);
			dispatch(fetchMultipleAudioApiFeaturesSuccess(features));
		} catch (error) {
			dispatch(fetchMultipleAudioApiFeaturesError());
		}
	};
};