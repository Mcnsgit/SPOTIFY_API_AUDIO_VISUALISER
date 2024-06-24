import { reducerCases } from '../common/constants.js';
const initialState = {
  input: '',
  query: '',
  artists: [],
  tracks: [],
  playlists: [],
  albums: [],
  loading: false,
  error: false
};
  

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case reducerCases.SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
      case reducerCases.FETCH_DATA_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case reducerCases.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.data,
      };
      case reducerCases.FETCH_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.data.error.message,
        };
    default:
      return state;
  }
};


