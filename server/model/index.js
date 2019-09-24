var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27001/test", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to db");
});

var reviewsSchema = new mongoose.Schema({
  _id: Number,
  product_id: Number,
  rating: Number,
  date: Date,
  summary: String,
  body: String,
  reviewer_name: String
});

var Review = mongoose.model("Review", reviewsSchema);

Review.find({ _id: 2 }, (err, data) => {
  if (err) console.log("error in query", err);
  console.log("find results", data);
});
 