import axios from 'axios';

const API_URL = 'http://localhost:5001/api/collections'; // Replace with your backend URL

// Fetch collections from the backend
export const getCollections = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching collections');
  }
};
