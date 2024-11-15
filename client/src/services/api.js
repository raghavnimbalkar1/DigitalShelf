import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Backend API URL

// Axios instance for API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch collections
export const getCollections = async () => {
  try {
    const response = await api.get('/collections');
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};
