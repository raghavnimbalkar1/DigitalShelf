import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    const newItem = { name, description };

    try {
      await axios.post('http://localhost:5001/api/collections', newItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      alert('Item added successfully');
      setName(''); // Clear input fields after submission
      setDescription('');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleAddItem}>
        <div>
          <label>Item Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemForm;
