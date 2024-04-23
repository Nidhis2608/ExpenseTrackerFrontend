import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './Component/Navbar';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
