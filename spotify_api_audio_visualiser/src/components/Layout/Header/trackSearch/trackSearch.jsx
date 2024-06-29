import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSearchData } from "../../../../redux/actions/searchActions";
import "./Search.css";
import withUiActions from "../../../../hoc/uiHoc.jsx";
const TrackSearch = ({ fetchSearchData, onSearch }) => (
	<div className="track-search-container">
		<form>
			<input
				name='search'
				type="text"
				placeholder="Search..."
				style={{ width: "100%", padding: "10px", margin: "10px 10px 10px 10px" }}
				onChange={event => fetchSearchData(event.target.value)}
				onClick={onSearch}
			/>
		</form>
	</div>
);

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
