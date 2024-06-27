// redux/reducers/searchReducer.js
const initialState = {
  query: '',
  results: {
    tracks: { items: [] }
  },
  loading: false,
  error: null
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'FETCH_DATA_PENDING':
      return { ...state, loading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, results: action.data };
    case 'FETCH_DATA_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default searchReducer;
