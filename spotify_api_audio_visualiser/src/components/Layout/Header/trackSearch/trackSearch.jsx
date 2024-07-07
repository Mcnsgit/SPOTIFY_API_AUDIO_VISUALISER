import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSearchData } from "../../../../redux/actions/searchActions";
import "./Search.css";
import withUiActions from "../../../../hoc/uiHoc.jsx";
import instance, { axiosToken } from "../../../../utils/axios";

import TrackSearchResults from "./trackSearchResults.jsx/index.js";
// const TrackSearch = ({ fetchSearchData, onSearch }) => (
class TrackSearch extends Component {
	state = {
		items: [],
		searchKey:"",
		fetching: true
	};
	playTracks = (context, offset) => {
		const tracks = this.state.items.slice(offset).map(s => s.uri);
		axiosToken.put('/me/player/play', { uris: tracks });
	};

	componentDidMount() {
		instance.get(`/search?q=${this.state.searchKey}&type=track`).then(response => {
			this.setState({
				fetching: false,
				items: response.data.tracks.items,
				next: response.data.tracks.next
			});
		});
	} 
	fetchMore = () => {
		if (this.state.next) {
			axiosToken.get(this.state.next).then(response => {
				this.setState(prevState => {
					return {
						items: [...prevState.items, ...response.data.tracks.items],
						next: response.data.tracks.next
					};
				});
			});
		}
	};
	render = () => {
		return (
			<div className="generic-container">
				<Spinner section loading={this.state.fetching}>
					<div className="track-search-container">
						<form onSubmit={this.searchTracks}>
							<input
								name='search'
								type="text"
								placeholder="Search..."
								style={{ width: "100%", padding: "10px", margin: "10px 10px 10px 10px" }}
								onChange={e => this.setState({ searchKey: e.target.value })}>
				</input>
				<button type={"submit"}>Search</button>
		</form>
	<div className="track-search-results">
			<TrackSearchResults
			removeDate={true}
				items={this.state.items}
				playTrack={this.playTracks}
				pauseTrack={this.props.pauseTrack}
				playing={this.props.playing}
				current={this.props.currentTrack}
				tracks={this.props.tracks}/>
</div>
			</div>
		</Spinner>
	</div>
		);
	};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchSearchData
		},
		dispatch
	);
};


export default connect(
	null,
	mapDispatchToProps
)(withUiActions(TrackSearch));
