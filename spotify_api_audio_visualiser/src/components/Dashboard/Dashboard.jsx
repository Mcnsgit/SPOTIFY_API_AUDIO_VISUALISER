
import React, { Component } from "react";

import { connect } from "react-redux";
import Footer from "../../components/Footer/Footer";
// import SideMenu from "../Layout/SideMenu/SideMenu";




class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>


                <Footer />
            </div>
        );
    }
}

export default connect()(Dashboard)