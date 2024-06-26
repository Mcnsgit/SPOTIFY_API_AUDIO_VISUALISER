import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../api/spotify';
import AudioVisualizer from "../Player/Visualiser/Visualiser";
import { Container } from "react-bootstrap";

import './Dashboard.scss';


const Dashboard = ({  token }) => {
   
    const [deviceId, setDeviceId] = useState('your_device_id_here');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [trackId, setTrackId] = useState('');

    const fetchData = async () => {
        if (token) {
            try {
                const data = await fetchUserProfile(token);
                setUser(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                setError(error);
                setLoading(false);
                console.error('Error fetching user profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);
     // Add deviceId as a dependency
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div className="dashboard-container">
          <div className="dashboard__main">
            <AudioVisualizer token={token} trackId={trackId} />
          </div>
        </div>
      );
    }
    

const mapStateToProps = (state) => ({
        token: state.sessionReducer.token,
        deviceId: state.sessionReducer.deviceId
    });

export default connect(mapStateToProps)(Dashboard);