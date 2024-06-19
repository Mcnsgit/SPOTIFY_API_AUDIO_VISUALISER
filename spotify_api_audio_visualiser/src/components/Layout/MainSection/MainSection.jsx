import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/Header/Header';
// import Footer from '../../../components/Footer/Footer';
import Dashboard from '../../../components/Dashboard/Dashboard';
// import LeftSection from '../SideMenu/leftSection';
// import RightSection from '../RightSection/RightSection';
import defaultProfile from './images/profile.png';
import './mainSection.scss';
import './mainSection.css';
// import Search from './Search/SearchResults';
import Modal from './playlistModal/modal';
import Browse from './sections/browse/browser';


class MainSection extends Component {
  render = () => {
    let name = this.props.user.display_name;
    let id = this.props.user.id;
    let img = this.props.user.image
      ? this.props.user.images[0].url
      : defaultProfile;
      
    return (
      <div className="main-section">
        <Header username={name || id} img={img} />
        <Modal />

  <div className="main-section-container">
       <Dashboard />
    </div>


      </div>
    );
    };
    }
    
    const mapStateToProps = state => {
      return {
        user: state.userReducer.user,
        view: state.uiReducer.view
        };
        };
        
        export default connect(mapStateToProps)(MainSection);
        // import Tracks from '../../components/sections/trackList/trackList';
        // import Playlist from '../../components/sections/playlist/playlist';
        // import Artist from '../../components/sections/artist/artist';
        // import Album from '../../components/sections/album/album';
        // import Albums from '../../components/sections/top/albums';
        // {this.props.view === 'search' ? <Search /> : null}
        // import Artists from '../../components/sections/top/artists';
        
        
    //   {this.props.view === 'playlist' ? <Playlist /> : null}
    //   {this.props.view === 'recently' ? <Tracks recently /> : null}
    //   {this.props.view === 'tracks' ? <Tracks /> : null}
    //   {this.props.view === 'artist' ? <Artist /> : null}
    //   {this.props.view === 'album' ? <Album /> : null}
    //   {this.props.view === 'albums' ? <Albums /> : null}
    //   {this.props.view === 'artists' ? <Artists /> : null}