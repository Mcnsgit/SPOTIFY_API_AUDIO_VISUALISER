import axios from '../../utils/axios';

const fetchDataPending = () => {
  return {
    type: 'FETCH_DATA_PENDING'
  };
};

const fetchDataSuccess = data => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    data
  };
};

const fetchDataError = () => {
  return {
    type: 'FETCH_DATA_ERROR'
  };
};

export const setQuery = query => {
  return {
    type: 'SET_QUERY',
    query
  };
};

const fetchQueryPending = () => {
  return {
    type: 'FETCH_QUERY_PENDING'
  };
};

export const fetchSearchData = query => {
  return async (dispatch, getState) => {
    dispatch(fetchQueryPending());
    if (!query) {
      return;
    }
    dispatch(fetchDataPending());
    dispatch(setQuery(query));
    
    const user = getState().userReducer.user;
    if (!user || !user.country) {
      // Handle the case where user or country is null
      dispatch(fetchDataError());
      return null;
    }

    const country = user.country;
    
    try {
      const responseArtist = await axios.get(`/search?q=${query}&type=artist&market=${country}&limit=2`);
      const responseAlbum = await axios.get(`/search?q=${query}&type=album&market=${country}&limit=2`);
      const responsePlaylist = await axios.get(`/search?q=${query}&type=playlist&market=${country}&limit=1`);
      const responseTrack = await axios.get(`/search?q=${query}&type=track&market=${country}&limit=1`);
      
      const responseData = {
        artist: responseArtist.data,
        album: responseAlbum.data,
        playlist: responsePlaylist.data,
        track: responseTrack.data
      };
      
      dispatch(fetchDataSuccess(responseData));
      return responseData;
    } catch (error) {
      dispatch(fetchDataError());
      return error;
    }
  };
};