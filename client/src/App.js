import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Header';
import Collection from './components/Collection';
import AddItemForm from './components/AddItemForm';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    if (authenticated) {
      axios
        .get('http://localhost:5001/api/collections', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [authenticated]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {authenticated && (
          <header className="App-header">
            <h1>Welcome to DigitalShelf!</h1>
            <button onClick={handleLogout}>Logout</button>
          </header>
        )}

        <Routes>
          <Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/collection" element={authenticated ? <Collection /> : <Navigate to="/login" />} />
          <Route path="/add" element={authenticated ? <AddItemForm /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
