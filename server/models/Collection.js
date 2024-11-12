const mongoose = require('mongoose');
const CollectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  type: { type: String, enum: ['Book', 'DVD', 'CD', 'Game'], required: true },
  coverImage: { type: String },
});
module.exports = mongoose.model('Collection', CollectionSchema);
