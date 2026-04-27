import React from 'react'
import { useNavigate } from "react-router-dom";
function OfflineorOnline() {
    const navigate = useNavigate();
    return (
        <>
            <div>OfflineorOnline</div>
            <button onClick={() => navigate("/LandingOn")}> online</button>
            <button onClick={() => navigate("/LandingOff")}>Offline</button>
        </>
    )
}

export default OfflineorOnline