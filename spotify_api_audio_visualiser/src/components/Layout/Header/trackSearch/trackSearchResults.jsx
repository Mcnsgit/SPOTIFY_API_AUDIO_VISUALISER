import React,{useEffect, useState} from "react";
import "./Search.css";
import Track from "../../track/track.jsx";
import Index from '../../../MainSection/Search/components/index/index';
import { useSelector } from "react-redux";
import '../../../MainSection/Search/SearchResults.scss'
import NoResults from '../../../MainSection/Search/components/noResults/noResults';
import Results from '../../../MainSection/Search/components/results/results';
import AllResults from '../../../MainSection/Search/components/allResults/allResults';
import { createSelector } from 'reselect';

const selectSearchReducer = state => state.searchReducer;

const selectQuery = createSelector(
  selectSearchReducer,
  searchReducer => searchReducer.query || ''
);

const selectArtists = createSelector(
  selectSearchReducer,
  searchReducer => searchReducer.artists || []
);

const selectTracks = createSelector(
  selectSearchReducer,
  searchReducer => searchReducer.tracks || []
);

const selectPlaylists = createSelector(
  selectSearchReducer,
  searchReducer => searchReducer.playlists || []
);

const selectAlbums = createSelector(
  selectSearchReducer,
  searchReducer => searchReducer.albums || []
);
const SearchResults = () => {
  const query = useSelector(selectQuery);
  const artists = useSelector(selectArtists);
  const tracks = useSelector(selectTracks);
  const playlists = useSelector(selectPlaylists);
  const albums = useSelector(selectAlbums);
  const results = tracks.length + playlists.length + artists.length + albums.length;
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState('');


  
  useEffect(() => {
    if (tracks.length > 0) {
      setItems(tracks);
    } else if (playlists.length > 0) {
      setItems(playlists);
    } else if (artists.length > 0) {
      setItems(artists);
    } else if (albums.length > 0) {
      setItems(albums);
    }
  }, [tracks, playlists, artists, albums]);

  const changeMode = (mode) => {
    setMode(mode);
  };

  return (
    <div className="search-container">
    {mode && <AllResults query={query} type={mode} items={items} />}
    {!mode && !query && <Index />}
    {!mode && query && results > 0 && (
      <Results changeMode={changeMode} artists={artists} songs={tracks} playlists={playlists} albums={albums} />
    )}
    {query && results === 0 && <NoResults query={query} />}
  </div>
  );
}


  

export default SearchResults;