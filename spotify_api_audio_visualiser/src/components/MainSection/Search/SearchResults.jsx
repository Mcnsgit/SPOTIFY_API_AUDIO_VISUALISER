import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchData } from '../../../redux/actions/searchActions';

import Index from './components/index/index';
import NoResults from '../sections/search/components/noResults/noResults';
import Results from './components/results/results';
import AllResults from './components/allResults/allResults';

import './SearchResults.scss'

const Search = () => {
  const query = useSelector((state) => state.searchReducer.query) || '';
  const artists = useSelector((state) => state.searchReducer.artists || []);
  const songs = useSelector((state) => state.searchReducer.tracks || []);
  const playlists = useSelector((state) => state.searchReducer.playlists || []);
  const albums = useSelector((state) => state.searchReducer.albums || []);
  
  const [mode, setMode] = useState('');

  const changeMode = (mode) => {
    setMode(mode);
  };

  const results = songs.length + playlists.length + artists.length + albums.length;

  return (
    <div className="search-container">
      {mode && <AllResults query={query} type={mode} items={playlists} />}
      {!mode && !query && <Index />}
      {!mode && query && results > 0 && (
        <Results changeMode={changeMode} artists={artists} songs={songs} playlists={playlists} albums={albums} />
      )}
      {query && results === 0 && <NoResults query={query} />}
    </div>
  );
};

export default Search;