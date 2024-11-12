// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Collection from './components/Collection';
import AddItemForm from './components/AddItemForm';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend API to display message
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/collections');
        setMessage(response.data.message); // Set the message from API response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to DigitalShelf!</h1>
          <p>{message || 'Loading collections...'}</p>
        </header>
        
        {/* Routing based on authentication */}
        <Routes>
          <Route path="/" element={authenticated ? <Home /> : <Login setAuthenticated={setAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/add" element={<AddItemForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
