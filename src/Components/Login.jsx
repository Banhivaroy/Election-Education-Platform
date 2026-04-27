import React from 'react'
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate("/mode")}>login </button>

    </div>
  )
}

export default Login