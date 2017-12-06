const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
  //we define the content of the dogs
  name: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  placeId: { type: String, required: true, unique: true }
  // visitors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Park', parkSchema);
