import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Collection = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/collections', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        setItems(res.data);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections.');
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Collection Items</h1>
      {error ? <p>{error}</p> : items.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Collection;
