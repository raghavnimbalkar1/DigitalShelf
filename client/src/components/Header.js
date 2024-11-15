import React, { useEffect, useState } from 'react';
import { getCollections } from '../services/api';

const Home = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <h1>Collections</h1>
      {loading ? (
        <p>Loading collections...</p>
      ) : (
        collections.map((collection, index) => (
          <div key={index}>
            <h2>{collection.name}</h2>
            <p>{collection.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
