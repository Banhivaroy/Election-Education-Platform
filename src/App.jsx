
import './App.css'
import LandingOn from './Components/LandingOn'
import Candidates from './Components/Candidates'
import Vote from './Components/Vote'
import Results from "./Components/Results"
import VoterList from "./Components/VoterList"
import YourArea from "./Components/YourArea"
import Login from "./Components/Login"
import OfflineorOnline from "./Components/OfflineorOnline"
import LandingOff from "./Components/LandingOff"
import PublicRoute from "./Components/PublicRoute"



import { Routes, Route } from "react-router-dom"
function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/landingOn" element={<LandingOn />} />
        <Route path="/landingOff" element={<LandingOff />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/area" element={<YourArea />} />
        <Route path="/results" element={<Results />} />
        <Route path="/voterlist" element={<VoterList />} />
        <Route path="/" element={<OfflineorOnline />} />

      </Routes>

    </>
  )
}

export default App
