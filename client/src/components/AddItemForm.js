// src/components/AddItemForm.js
import React, { useState } from 'react';
import api from '../api';

const AddItemForm = () => {
  const [formData, setFormData] = useState({ title: '', category: '', description: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/collections', formData);
      alert('Item added to collection');
    } catch (err) {
      console.error(err);
      alert('Failed to add item');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
