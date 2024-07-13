import React, { useState, Component } from "react";
import { connect,useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSearchData } from "../../../../redux/actions/searchActions";
import "./Search.css";
import withUiActions from "../../../../hoc/uiHoc.jsx";
import instance from "../../../../utils/axios";

import TrackSearchResults from "./trackSearchResults.jsx";
// const TrackSearch = ({ fetchSearchData, onSearch }) => (
	const TrackSearch = () => {
		const [searchKey, setSearchKey] = useState("");
		const [fetching, setFetching] = useState(false);
		const [items, setItems] = useState([]);
		const [next, setNext] = useState(null);
		const dispatch = useDispatch();
		
		const { tracks, artists, albums, playlists } = useSelector(state => state.searchReducer);

		// const playing = useSelector((state) => state.player.playing);
		// const currentTrack = useSelector((state) => state.player.currentTrack);

		const accessToken = useSelector((state) => state.tokenReducer.token);
	
	
		const searchTracks = async (event) => {
			event.preventDefault();
			setFetching(true);
			try {
				const response = await instance.get(`/search?q=${searchKey}&type=track,album,playlist`, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setItems(response.data.tracks.items);
				setNext(response.data.tracks.next);
				setFetching(false);
			} catch (error) {
				if (error.response && error.response.status === 401) {
					try {
						const refreshToken = await AuthService.refreshToken();
						if (refreshToken) {
							dispatch(setToken(refreshToken));
							searchTracks(event); // Retry search with new token
						}
					} catch (refreshError) {
						console.error("Error refreshing token:", refreshError);
					}
				} else {
					console.error("Error fetching search data:", error);
				}
				setFetching(false);
			}
		};

	const fetchMore = async () =>{
		if(next) {
			try{
				const response = await instance.get(next, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		setItems((prevItems) => [...prevItems, ...response.data.tracks.items]);
		setNext(response.data.tracks.next);
	} catch (error) {
		console.error("Error fetching more data:", error);
	}
}
};

return (
<div className="generic-container">
	{fetching ? (
		<div>Loading...</div>
	) : (
		<div className="track-search-container">
			<form onSubmit={searchTracks}>
				<input
					name="search"
					type="text"
					placeholder="Search..."
					style={{ width: "100%", padding: "10px", margin: "10px 10px 10px 10px" }}
					value={searchKey}
					onChange={(e) => setSearchKey(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
			<div className="track-search-results">
							<TrackSearchResults
								query={searchKey}
								tracks={items}
								album={albums}
								artist={artists}
							/>
							{next && <button onClick={fetchMore}>Load More</button>}
						</div>
					</div>
				)}
			</div>
		);
	};
	
	export default withUiActions(TrackSearch);