// redux/actions/searchActions.js
import { searchTracks } from '../../api/spotify';

export const fetchDataPending = () => {
  return {
    type: 'FETCH_DATA_PENDING'
  };
};

export const fetchDataSuccess = data => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data
  };
};

export const fetchDataError = error => {
  return {
    type: 'FETCH_DATA_ERROR',
    error
  };
};

export const setQuery = query => {
  return {
    type: 'SET_QUERY',
    query
  };
};

export const fetchSearchData = query => {
  return async (dispatch, getState) => {
    dispatch(setQuery(query));
    if (!query) {
      return;
    }
    dispatch(fetchDataPending());
    const country = getState().userReducer.user?.country || 'US';
    try {
      const response = await searchTracks(query, country);
      dispatch(fetchDataSuccess(response.tracks));
      return response.tracks;
    } catch (error) {
      dispatch(fetchDataError(error));
      return error;
    }
  };
};