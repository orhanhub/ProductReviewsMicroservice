var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // load the data here
});

var reviewsSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId, //product
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Number,
      response: String,
      body: String,
      date: Date,
      reviewer_name: String,
      helpfulness: Number,
      photos: [String]
    }
  ],
  ratings: {
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number
  },
  recommended: {
    0: Number,
    1: Number,
    Null: Number
  },
  characteristics: { any: Object }
});
