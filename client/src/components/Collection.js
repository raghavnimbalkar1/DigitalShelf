// src/components/Collection.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const Collection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/collections');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Collection Items</h1>
      {items.map((item) => (
        <div key={item._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <h2>{item.title}</h2>
          <p>{item.category}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Collection;
