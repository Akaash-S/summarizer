import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

function LoSi() {
  return (
    <Router>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <nav>
          <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
          <Link to="/signup" style={{ margin: '0 10px' }}>Signup</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default LoSi;
