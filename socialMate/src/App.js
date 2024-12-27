import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileState from "./context/profile/ProfileState";
import Signup from "./components/Signup";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  

  return (
    <ProfileState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ProfileState>
  );
}

export default App;
