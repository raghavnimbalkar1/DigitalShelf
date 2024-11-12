const express = require('express');
const { getCollections, addCollection } = require('../controllers/collectionController');
const router = express.Router();

// Middleware to authenticate user
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, getCollections);
router.post('/', authenticate, addCollection);

module.exports = router;
