
import './App.css'
import Landing from './Components/Landing'
import Candidates from './Components/Candidates'
import Vote from './Components/Vote'
import Results from "./Components/Results"
import VoterList from "./Components/VoterList"
import YourArea from "./Components/YourArea"


import { Routes, Route } from "react-router-dom"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/area" element={<YourArea />} />
        <Route path="/results" element={<Results />} />
        <Route path="/voterlist" element={<VoterList />} />
      </Routes>

    </>
  )
}

export default App
