import { useState } from 'react'
import './App.css'
import Landing from './Components/Landing'
import Navbar from "./Components/Navbar"
import { Routes, Route } from "react-router-dom"
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            {<Navbar />}
            {<Landing />}
          </>
        }
        />

      </Routes>

    </>
  )
}

export default App
