require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const collectionRoutes = require('./routes/collectionRoutes');

const app = express();

//Middleware
app.use(express.json());
app.use(cors()); 

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Failed to connect to MongoDB:", err));

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/collections', collectionRoutes); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
