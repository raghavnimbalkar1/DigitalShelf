const Collection = require('../models/Collection');

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.userId });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addCollection = async (req, res) => {
  const { name, type, coverImage } = req.body;
  try {
    const collection = await Collection.create({ user: req.userId, name, type, coverImage });
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

