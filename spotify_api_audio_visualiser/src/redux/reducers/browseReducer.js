const initialState = {
  view: [],

  fetchCategoriesError: false,
  fetchNewReleasesError: false,
  fetchFeaturedError: false,
};

const browseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        view: action.payload.categories.items,
        fetchCategoriesError: false,
      };
    case 'FETCH_CATEGORIES_ERROR':
      return {
        ...state,
        fetchCategoriesError: true,
      };
    case 'FETCH_NEW_RELEASES_SUCCESS':
      return {
        ...state,
        view: action.payload.newReleases.items,
        fetchNewReleasesError: false,
      };
    case 'FETCH_NEW_RELEASES_ERROR':
      return {
        ...state,
        fetchNewReleasesError: true,
      };
    case 'FETCH_FEATURED_SUCCESS':
      return {
        ...state,
        view: action.payload.featured.items,
        fetchFeaturedError: false,
      };
    case 'FETCH_FEATURED_ERROR':
      return {
        ...state,
        fetchFeaturedError: true,
      };
    default:
      return state;
  }
};

export default browseReducer;
