import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verifyotp from "./components/Verifyotp";
import ProfileState from "./context/Profile/ProfileState";
import Verifyemail from "./components/Verifyemail";

function App() {
  return (
    <ProfileState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/verifyemail" element ={<Verifyemail />} />
        </Routes>
      </Router>
   </ProfileState>
  );
}

export default App;
