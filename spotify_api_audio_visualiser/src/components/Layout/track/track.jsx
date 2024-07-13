import React from "react";
import moment from "moment";
import withUiActions from "../../../hoc/uiHoc";
import { formatDuration } from "../../../helpers/format";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../../utils/axios";


const TrackSearch = ({ onSearch }) => {
  const [items, setItems] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [fetching, setFetching] = useState(false);
  const [next, setNext] = useState(null);

  const dispatch = useDispatch();
  const playing = useSelector((state) => state.player.playing);
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const tracks = useSelector((state) => state.player.tracks);

  const playTracks = async (uri, offset) => {
    try {
      await instance.put('/me/player/play', { uris: [uri], offset: { position: offset } });
    } catch (error) {
      console.error("Error playing track:", error);
    }
  };

  const pauseTrack = async () => {
    try {
      await instance.put('/me/player/pause');
    } catch (error) {
      console.error("Error pausing track:", error);
    }
  };

  const searchTracks = async (event) => {
    event.preventDefault();
    setFetching(true);

    try {
      const response = await instance.get(`/search?q=${searchKey}&type=track,album,playlist`);
      setItems(response.data.tracks.items);
      setNext(response.data.tracks.next);
      setFetching(false);
    } catch (error) {
      console.error("Error fetching search data:", error);
      setFetching(false);
    }
  };

  const fetchMore = async () => {
    if (next) {
      try {
        const response = await instance.get(next);
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
        <Spinner section loading={fetching}>
          Loading...
        </Spinner>
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
              items={items}
              playTrack={playTracks}
              pauseTrack={pauseTrack}
              playing={playing}
              current={currentTrack}
              tracks={tracks}
            />
            {next && <button onClick={fetchMore}>Load More</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default withUiActions(TrackSearch);