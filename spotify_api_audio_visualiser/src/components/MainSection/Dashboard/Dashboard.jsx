import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../api/spotify';
import AudioVisualizer from "../Player/Visualiser/Visualiser";
import { Container } from "react-bootstrap";
import LeftSideMenu from "../../Layout/SideMenu/LeftSideMenu";

const Dashboard = ({ token }) => {
    const [user, setUser] = useState(null);
    const [deviceId, setDeviceId] = useState('your_device_id_here');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if(token) {
                try {
                    const data = await fetchUserProfile(token);
                    setUser(data);
                    setLoading(false);
                    console.log(data);
                } catch(error) {
                    setError(error);
                    setLoading(false);
                    console.error('Error fetching user profile:', error);
                }
            }
        };
        fetchData();
        return () => {
            if (audioContextRef.current) {
                    audioContextRef.current.close();
                }
            };
        }, [token, deviceId]); // Add deviceId as a dependency

    if(loading) return <div>Loading...</div>;
    if(error) return <div>Error: {error.message}</div>;

    return (
        <div id="dashboard" class="bg-gray-800 text-center text-red-100 w-full overflow-y-scroll">
    <div class="text-left p-8 bg-gradient-to-b from-green-500"></div> 
    <h2 class="text-3xl capitalize">Dashboard</h2>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
        <AudioVisualizer token={token} deviceId={deviceId} />
        </div>
    </div>

            
            


        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.sessionReducer.token,
        deviceId: state.sessionReducer.deviceId
    };
}

export default connect(mapStateToProps)(Dashboard);