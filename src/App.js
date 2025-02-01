import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarWithSidebar from './components/navbar/NavBar'; // Updated Navbar to Bootstrap
import Gallery from './components/gallery/Gallery';
import LoginPage from './components/Login';
import Videos from './components/Videos/Videos';
import PortfolioDashboard from './components/portfolio/PortfolioDashboard';
import ServiceDashboard from './components/service/ServiceDashboard';
import TattooDashboard from './components/TattooDashboard';
import { Container } from 'react-bootstrap';

function App() {
  const [activeComponent, setActiveComponent] = useState('Users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null); // State to track login status

  // Check if user is logged in when app initializes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Load user from localStorage
    }
  }, []);

  // Render a fallback component for components without dedicated routes
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Gallery':
        return <Gallery />;
      case 'Videos':
        return <Videos />;
      case 'Portfolio':
        return <PortfolioDashboard />;
      case 'TattooDashboard':
        return <TattooDashboard />;
      default:
        return <Gallery />;
    }
  };

  // Handle login
  const handleLogin = (user) => {
    setUser(user); // Set the user in state
    localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user state on logout
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <Router>
      <div className="d-flex vh-100">
        {/* Conditionally render Navbar only if user is logged in */}
        {user && (
          <NavbarWithSidebar
            setActiveComponent={setActiveComponent}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout} // Pass logout handler to Navbar
          />
        )}

        {/* Main Content */}
        <Container
          fluid
          className={`transition-all px-4 py-3 ${isSidebarOpen ? 'ms-250' : 'ms-0'}`}
          style={{ flex: 1 }}
        >
          <Routes>
            {/* Login Page */}
            <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />

            {/* Redirect to Dashboard or Login Page based on login status */}
            <Route
              path="/"
              element={user ? <Gallery /> : <Navigate to="/login" />}
            />

            {/* Other routes */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/portfolio" element={<PortfolioDashboard />} />
            <Route path="/service" element={<ServiceDashboard />} />
            <Route path="/tattoodashboard" element={<TattooDashboard />} />

            {/* Fallback render logic for other sidebar components */}
            <Route path="*" element={renderComponent()} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
