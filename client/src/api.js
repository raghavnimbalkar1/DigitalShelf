// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Header';
import Collection from './components/Collection';
import AddItemForm from './components/AddItemForm';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('');

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  // Fetch message from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/collections');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to DigitalShelf!</h1>
          <p>{message || 'Loading collections...'}</p>
          {authenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </header>

        <nav>
          <Link to="/">Home</Link>
          {authenticated && <Link to="/collection">Collection</Link>}
          {authenticated && <Link to="/add">Add Item</Link>}
        </nav>

        {/* Routing based on authentication */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={authenticated ? <Navigate to="/" /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/collection" element={authenticated ? <Collection /> : <Navigate to="/login" />} />
          <Route path="/add" element={authenticated ? <AddItemForm /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
