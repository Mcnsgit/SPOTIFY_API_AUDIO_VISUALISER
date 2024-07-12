import React, { useState, useMemo } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { fetchSearchData } from "../../../redux/actions/searchActions";
import { fetchPlaylistsMenu } from "../../../redux/actions/playlistActions.js";
import withUiActions from "../../../hoc/uiHoc.jsx";
import MenuItem from "./menuItem.jsx";
import "./leftSection.scss";
import propTypes from "prop-types";
const menuItems = [
	{ name: "Search", view: "search", id: "search" },
	{ name: "Visualizer", view: "visualizer", id: "visualizer" },
	{ name: "Browse", view: "browse", id: "browse" },
	{ name: "tracks", view: "tracks", id: "tracks" },
	{ name: "Albums", view: "albums", id: "albums" },
	{ name: "artists", view: "artists", id: "artists" },
	{ name: "New Playlist", view: "newPlaylist", id: "newPlaylist" }

];
const selectPlaylists = createSelector(
  [state => state.playlistReducer.playlists],
  playlists => {
    console.log('Playlists:', playlists);
    return playlists && playlists.items ? playlists.items : [];
  }
);


const LeftSection = () => {
  const [activeItem, setActiveItem] = useState("search");
  const playlists = useSelector(selectPlaylists);
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    dispatch(fetchSearchData(query));
    dispatch(setView("search")); // Uncomment this if setView is defined
  };

	const handleSetActive = (item, playlist = false) => {
    setActiveItem(item.id);
    if (item.view === "newPlaylist") {
      handleItemClick(item);
      setModal(true); // Uncomment this if setModal is defined
    } else {
      setView(item.view || "search"); // Uncomment this if setView is defined
      if (playlist) {
        fetchPlaylistsMenu();
      }
    }
  };

  const generateItems = useMemo(() => (items, playlist = false) => {
    return items.map(item => (
      <MenuItem
        key={item.id}
        title={item.name}
        active={activeItem === item.id}
        onClick={() => handleSetActive(item, playlist)}
      />
    ));
  }, [activeItem, handleSetActive]);

  return (
    <div className="left-section">
      <div className='side-menu'>
        <ul className="side-menu-container">
          {generateItems(menuItems)}
          <h3 className="library-header">Your Library</h3>
          <div className="user-playlist-container">
            {generateItems(playlists.slice(0, 10), true)}
          </div>
          <div className="button-section">
            <button onClick={() => setModal(true)}>Create Playlist</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

LeftSection.propTypes = {
  setView: propTypes.func,
  setModal: propTypes.func,
  fetchPlaylistsMenu: propTypes.func,
};

export default connect(
  null,
  { fetchSearchData, fetchPlaylistsMenu }
)(withUiActions(LeftSection));