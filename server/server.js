const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());

// Your other middleware and routes go here
app.use(express.json()); // For JSON body parsing

// Example route
app.get('/api/collections', (req, res) => {
  res.json({ message: 'Fetching collections...' });
});


const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
