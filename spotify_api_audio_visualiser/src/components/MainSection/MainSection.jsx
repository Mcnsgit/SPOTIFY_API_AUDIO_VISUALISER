import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import profile from '../../assets/images/profile.png';
import './mainSection.scss';
import Footer from '../Layout/Footer/Footer';
import Visualizer from './Player/Visualiser/Visualiser'
import Header from '../Layout/Header/Header';
import LeftSection from '../Layout/SideMenu/leftSection';
import { fetchUserPlaylists } from '../../api/spotify';
import Modal from './playlistModal/modal';
import TracksList from '../../components/MainSection/sections/trackList/trackList.jsx';
// import Artists from '../../components/MainSection/sections/a/artists.jsx';
import Albums from '../../components/MainSection/sections/top/albums.jsx';
import Browse from '../../components/MainSection/sections/browse/browser.jsx';
import Artist from '../../components/MainSection/sections/top/artists.jsx';
// import Album from '../../components/MainSection/sections/top/albums.jsx';
import Search from '../../components/MainSection/sections/search/search.jsx';
// import Songs from '../../components/MainSection/sections/recently/recently.jsx';
import Playlist from '../../components/MainSection/sections/playlist/playlist.jsx';



const MainSection = ({token}) => {
  const [playlists, setPlaylists] = useState([]);
  const user = useSelector(state => state.userReducer.user);
  const view = useSelector(state => state.uiReducer.view);

  const name = user.display_name;
  const id = user.id;

  const img = user?.images && user.images.length > 0
  ? user.images[0].url
  : profile;

useEffect(() => {
  if (token) {
    fetchUserPlaylists().then(data => setPlaylists(data.items)).catch(console.error);
  }
}, [token]);

  
  return (

      <div className="main-section">
        <div className='header-section'></div>
        <Header username={name || id} img={img} />
        <div className="main-section-container">
        <Modal />
          {view === 'search' && <Search />}
          {view === 'browse' && <Browse />}
          {view === 'playlist' && <Playlist />}
          {view === 'songs' && <Songs />}
          {view === 'artist' && <Artist />}
          {view === 'albums' && <Albums />}
          {view === 'visualiser' && <Visualizer />}
        </div>
        <Footer />
      </div>
    );
  };
  
  export default MainSection;