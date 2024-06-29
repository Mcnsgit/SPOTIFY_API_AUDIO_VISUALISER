import React, {useState} from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchSearchData } from "../../../redux/actions/searchActions";
import { fetchPlaylistsMenu } from "../../../redux/actions/playlistActions.js";
import withUiActions from "../../../hoc/uiHoc.jsx";
import MenuItem from "./menuItem.jsx";
import Browse from "../../MainSection/sections/browse/browser";
import "./leftSection.scss";
import Search from "../../MainSection/sections/search/search";
import NewPlaylist from "./components/newplaylist";
import TrackList from "../../MainSection/sections/trackList/trackList";
import AlbumList from "../../MainSection/sections/top/albums";
import artists from "../../MainSection/sections/top/artists";


const menuItems = [
	{ name: "Search", view: "search", id: "search" },
	{ name: "Visualizer", view: "visualizer", id: "visualizer" },
	{ name: "Browse", view: "browse", id: "browse" },
	{ name: "Songs", view: "trackList", id: "songs" },
	{ name: "Albums", view: "albums", id: "albums" },
	{ name: "artists", view: "artists", id: "artists" },
	{ name: "New Playlist", view: "newPlaylist", id: "newPlaylist" }
];


const LeftSection = ({ view, setModal, headerTitle, fetchPlaylistsMenu, fetchSearchData
}) => {
	const dispatch = useDispatch();
	const playlists = useSelector(state => state.playlistReducer.playlists?.items || []);
	const searchResults = useSelector(state => state.searchReducer.results?.tracks?.items || []);
	const [activeItem, setActiveItem] = useState("search");
  
	const handleItemClick = (item) => {
		setActiveItem(item.id);
		setView(item.view);
	};
  
	const handleSetActive = (item, playlist = false) => {
		setActiveItem(item.id);
		if (item.view === "newPlaylist") {
			handleItemClick(item);
			setModal(true);
		} else {
			setView(item.view || "search");
		}
	};
  
	const generateItems = (items, playlist = false) => {
		return items.map(item => (
			<MenuItem
				key={item.id}
				title={item.name}
				active={activeItem === item.id}
				onClick={() => handleSetActive(item, playlist)}
			/>
		));
	};
  
	const handleSearch = (event) => {
		const searchQuery = event.target.value;
		if (!searchQuery) return;
		dispatch(fetchSearchData(searchQuery));
		handleSetActive({ id: "search", view: "search" });
	};
  
	const renderContent = () => {
		switch (view) {
		case "search":
			return <Search />;
		case "browse":
			return <Browse />;
		case "songs":
			return <TrackList />;
		case "albums":
			return <AlbumList />;
		case "artists":
			return <ArtistList />;
		default:
			return <Search />;
		}
	};
  
	return (
		<div className="left-section">
			<div className='side-menu'>
				<ul className="side-menu-container">
					<input
						type="text"
						placeholder="Search..."
						className="side-menu-search"
						onChange={handleSearch}
					/>
					<button onClick={handleSearch}>Search</button>
					{generateItems(menuItems)}
					<h3 className="library-header">Your Library</h3>
					<div className="user-playlist-container">
						{generateItems(playlists.slice(0, 10), true)}
					</div>
					<div className="button-section">
						<button onClick={() => setModal(true)}>Create Playlist</button>
						<NewPlaylist setModal={setModal} />
					</div>
				</ul>
			</div>
			<div className='left-section-container'>
				{renderContent()}
				{activeItem === "search" && searchResults && searchResults.map(result => (
					<MenuItem
						key={result.id}
						title={result.name}
						active={false}
						className="search-result-item"
					/>
				))}
			</div>
		</div>
	);
};
  
const mapStateToProps = state => ({
	view: state.uiReducer.view,
	headerTitle: state.uiReducer.headerTitle,
	searchResults: state.searchReducer.results,
	playlists: state.playlistReducer.playlists
});
  
const mapDispatchToProps = dispatch => ({
	fetchPlaylistsMenu: () => dispatch(fetchPlaylistsMenu()),
	fetchSearchData: query => dispatch(fetchSearchData(query)),
});
  
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withUiActions(LeftSection));