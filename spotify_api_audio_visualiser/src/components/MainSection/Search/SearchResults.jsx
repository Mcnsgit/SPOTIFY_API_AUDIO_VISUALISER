import React from 'react';
import { useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { fetchSearchData } from '../../../../redux/actions/searchActions';

import Index from './components/index/index';
import NoResults from './components/noResults/noResults';
import Results from './components/results/results';
// import AllResults from './components/allResults/allResults';

import './SearchResults.css';
const SearchResults = () => {

  const { query, tracks, playlists, artists, albums } = useSelector((state) => state.searchReducer);
  const results = (tracks.length > 0 || playlists.length > 0 || artists.length > 0 || albums.length > 0);

  return (
    <div className="search-container">
      {!query && <Index />}
      {query && results ? (
        <Results
          tracks={tracks}
          playlists={playlists}
          artists={artists}
          albums={albums}
        />
      ) : (
        query && <NoResults query={query} />
      )}
    </div>
  );
};

export default SearchResults;


//   componentDidUpdate(prevProps) {
//     if (prevProps.query !== this.props.query) {
//       this.setState({ mode: '' });
//     }
//   }

//   changeMode = mode => {
//     this.setState({ mode: mode });
//   };

//   render = () => {
//     const results =
//       this.props.tracks.length ||
//       this.props.playlists.length ||
//       this.props.artists.length ||
//       this.props.albums.length;

//     return (
//       <div className="search-container">
//         {this.state.mode && (
//           <AllResults
//             query={this.props.query}
//             type={this.state.mode}
//             items={this.props.playlists}
//           />
//         )}
//         {!this.state.mode && !this.props.query && <Index />}
//         {!this.state.mode && this.props.query && results ? (
//           <Results
//             changeMode={this.changeMode}
//             {...this.props}
//           />
//         ) : null}
//         {this.props.query && !results && <NoResults query={this.props.query} />}
//       </div>
//     );
//   };
// }

// const mapStateToProps = state => {
//   return {
//     query: state.searchReducer.query,
//     artists: state.searchReducer.artists || [],
//     tracks: state.searchReducer.tracks || [],
//     playlists: state.searchReducer.playlists || [],
//     albums: state.searchReducer.albums || []
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       fetchSearchData
//     },
//     dispatch
//   );
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Search);
