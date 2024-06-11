import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Register';
import LandingPage from './Components/Home';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/landing" element={<PrivateRoute element={<LandingPage />} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
