import axios from "axios";
import { useEffect, useState } from "react";
import "./online.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  return (
    <div className="chatOnline">
        <div className="onlineTalent" >
          <div className="onlineImageContainer">
            <img
              className="onlineImage"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg&_gl=1*196en04*_ga*NzM5NDk0MTMxLjE2NjUyMjM3OTc.*_ga_8JE65Q40S6*MTY2NjA2NTM4NS42LjEuMTY2NjA2NTQ2OS4wLjAuMA.."
              alt=""
            />
            <div className="onlineBadge"></div>
          </div>
          <span className="chatOnlineName">John Doe</span>
        </div>
    </div>
  );
}