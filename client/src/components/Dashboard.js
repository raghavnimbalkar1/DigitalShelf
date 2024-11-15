import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('Loading collections...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/collections', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setMessage(response.data.message || 'Collections loaded successfully!');
      } catch (error) {
        setMessage('Failed to load collections.');
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
