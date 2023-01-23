import React from "react";

import profileImage from "./download.png";
import { IoIosNotificationsOutline } from 'react-icons/io'
import "./topnav.css";

function topnav() {
  return (
    <div className="top_nav">
      <div className="top_nav-wrapper">
        <div className="search_box">
        </div>
        <div className="top_nav-right">
          <span className="notification">
            < IoIosNotificationsOutline className="notfication-icon" />
            <span className="badge">1</span>
          </span>
          <div className="profile">
            <img src={profileImage} alt="profile-img" />

          </div>
        </div>
      </div>
    </div>
  );
}

export default topnav;
