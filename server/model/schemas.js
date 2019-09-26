const mongoose = require("mongoose");

var reviewsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  review_email: String,
  response: String,
  helpfulness: Number
});

var reviewsPhotosSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  review_id: Number,
  url: String
});

var characteristicsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //tied to characteristicreviewsSchema char_id
  product_id: Number,
  name: String
});

var characteristicreviewsSchema = new mongoose.Schema({
  _id: Number,
  characteristic_id: mongoose.Schema.Types.ObjectId,
  review_id: Number,
  value: Number
});

//export the schemas
exports.Review = mongoose.model("Review", reviewsSchema);
exports.Characteristic = mongoose.model(
  "Characteristic",
  characteristicsSchema
);
exports.CharacteristicReview = mongoose.model(
  "CharacteristicReview",
  characteristicreviewsSchema
);
