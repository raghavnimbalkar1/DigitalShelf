// pages/Home.js
import React, { useEffect, useState } from 'react';
import { getCollections } from '../services/api'; // Import the API function

const Home = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch collections when the component mounts
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchCollections();
  }, []); // Empty dependency array ensures this runs once when component mounts

  return (
    <div>
      <h1>Collections</h1>
      {loading ? (
        <p>Loading collections...</p>
      ) : (
        <div>
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <div key={index}>
                <h2>{collection.name}</h2>
                <p>{collection.description}</p>
              </div>
            ))
          ) : (
            <p>No collections found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
