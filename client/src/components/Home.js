// components/Home.js
import React from 'react';

const Home = ({ collections }) => {
  return (
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
  );
};

export default Home;
