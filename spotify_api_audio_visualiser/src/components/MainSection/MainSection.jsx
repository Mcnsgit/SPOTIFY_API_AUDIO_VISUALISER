import React, { Component } from 'react';
import { connect } from 'react-redux';


import Dashboard from './Dashboard/Dashboard';
// import LeftSection from '../SideMenu/leftSection';
// import RightSection from '../RightSection/RightSection';
import profile from '../../assets/images/profile.png';
import './mainSection.scss';


// import Modal from './playlistModal/modal';
import Header from '../Layout/Header/Header';
import './mainSection.scss';
import Footer from '../Layout/Footer/Footer';


class MainSection extends Component {
  render = () => {
    const { name, id, images } = this.props.user;
    const img = images[0]     ? images[0].url : profile;

    return (
      <div className="main-section">
      <Header username={name || id} img={img} />
      <div className="main-app-container">
        <Dashboard />
      </div>
        <div className="footer">
        <Footer />
        </div>
      </div>
    );
    };
    }

    const mapStateToProps = (state) => ({
        user: state.userReducer.user,
     
        });
      
        
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