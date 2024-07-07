import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserProfile } from "../../../api/spotify";
import Header from '../../Layout/Header/Header';
import LeftSection from '../../Layout/SideMenu/leftSection';
import Footer from '../../Layout/Footer/Footer';
import MainSection from '../../MainSection/MainSection';
import profile from '../../../assets/images/profile.png';
import "./Dashboard.scss";

const Dashboard = () => {
  // const [deviceId, setDeviceId] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // const token = useSelector(state => state.sessionReducer.token);
  // const loggedIn = useSelector(state => state.sessionReducer.loggedIn);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (token) {
  //       try {
  //         const data = await fetchUserProfile(token);
  //         setUser(data);
  //         setDeviceId(data.device_id);
  //         setLoading(false);
  //       } catch (error) {
  //         setError(error);
  //         setLoading(false);
  //         console.error("Error fetching user profile:", error);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const displayName = user?.display_name || user?.id || 'User';
  const img = user?.images?.[0]?.url || profile;

  // changeRenderButtons(event) {
  //   console.log(event);
  //   this.setState({ currentVisualization: parseInt(event.target.id) });
  // }

  return (
    <div className="dashboard-container">
      <div className='header-section'>
        <Header username={displayName || id} img={img} />
      </div>
      <div className="left-container">
        <LeftSection />
      </div>
      <div className="main-section-container">

      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;