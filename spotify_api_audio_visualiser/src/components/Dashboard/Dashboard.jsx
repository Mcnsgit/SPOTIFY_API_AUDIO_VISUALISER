import React , { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {fetchUserProfile} from "../../api/spotify";
import './Dashboard.css'
import AudioVisualizer from "../Player/Visualiser/Visualiser";
import { Container} from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from '../Header/Header';
import Modal from '../Layout/MainSection/playlistModal/modal';
import defaultProfile from '../Layout/MainSection/images/profile.png';


const Dashboard = ({ token }) => {
    const [user, setUser] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
  
    useEffect(() => {
      const getUserProfile = async () => {
        try {
          const data = await fetchUserProfile(token);
          setUser(data);
          // Replace with actual logic to get the device ID
          setDeviceId('your_device_id_here');
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
  
      getUserProfile();
    }, [token]);
  
    return (
      <div className="dashboard">
        {user && (
          <div className="user-profile">
            <h2>Welcome, {user.display_name}</h2>
          </div>
        )}
        <div className="player-section">
          <AudioVisualizer token={token} deviceId={deviceId} />
          <Footer />
        </div>
      </div>
    );
  };
  
  export default Dashboard;