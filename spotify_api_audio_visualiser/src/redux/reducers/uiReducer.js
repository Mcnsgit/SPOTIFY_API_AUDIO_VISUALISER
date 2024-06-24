import {reducerCases}  from "../common/constants";

const initialState = {
  input: '',
  view: 'search',
  headerTitle: 'Search',

};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case reducerCases.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };
      case reducerCases.SET_MODAL:
    case reducerCases.UPDATE_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.title,
      };
    default:
      return state;
  }
};

export default uiReducer;