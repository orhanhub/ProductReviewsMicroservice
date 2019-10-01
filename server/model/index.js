//Environment
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   poolSize: 10
// });
mongoose.connect("mongodb://mongo:27017/test", { useNewUrlParser: true });

const db = mongoose.connection;

//Required files used in this module
const { Review, Characteristic, CharacteristicReview } = require("./schemas");

//DB Connection Check:
db.on("error", () => console.log("db connection error"));
db.once("open", () => console.log("connected to db"));

//Queries below

//Retrieve List of Reviews
exports.retrieveListQuery = query => {
  //convert string to a number
  //if/else block below converts string queries to integer before passing it to aggregate functions
  // else block is for future use cases where PUT requests under mongoDB can be ObjectId type;

  let parsedquery;
  if (typeof query === "string") {
    parsedquery = parseInt(query);
  } else {
    parsedquery = query;
  }

  // reviews/:product_id/list end point database query:
  return Review.aggregate([
    { $match: { product_id: parsedquery } },
    {
      $lookup: {
        from: "reviewsphotos",
        localField: "_id",
        foreignField: "review_id",
        as: "photos"
      }
    }
  ]).exec();
};

exports.retrieveone = query => {
  //convert string to a number
  //if/else block below converts string queries to integer before passing it to aggregate functions
  // else block is for future use cases where PUT requests under mongoDB can be ObjectId type;

  let parsedquery;
  if (typeof query === "string") {
    parsedquery = parseInt(query);
  } else {
    parsedquery = query;
  }

  return Review.findOne({ product_id: parsedquery });
};
// Retrieve Meta was split into 3 sub queries for optimization purposes
//   characteristics, ratings, recommended

//characteristics:
exports.characteristics = query => {
  //convert string to a number
  //if/else block below converts string queries to integer before passing it to aggregate functions
  // else block is for future use cases where PUT requests under mongoDB can be ObjectId type;

  let parsedquery;
  if (typeof query === "string") {
    parsedquery = parseInt(query);
  } else {
    parsedquery = query;
  }

  return Characteristic.aggregate([
    { $match: { product_id: parsedquery } },
    {
      $lookup: {
        from: "characteristicreviews",
        localField: "_id",
        foreignField: "characteristic_id",
        as: "joinder"
      }
    },
    { $unwind: "$joinder" },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        average: { $avg: "$joinder.value" }
      }
    }
  ]).exec();
};

exports.ratings = query => {
  let parsedquery;
  if (typeof query === "string") {
    parsedquery = parseInt(query);
  } else {
    parsedquery = query;
  }

  return Review.aggregate([
    { $match: { product_id: parsedquery } },
    { $project: { rating: 1 } },
    { $group: { _id: "$rating", count: { $sum: 1 } } }
  ]).exec();
};

exports.recommended = query => {
  let parsedquery;
  if (typeof query === "string") {
    parsedquery = parseInt(query);
  } else {
    parsedquery = query;
  }

  return Review.aggregate([
    { $match: { product_id: parsedquery } },
    { $project: { recommend: 1 } },
    { $group: { _id: "$recommend", count: { $sum: 1 } } }
  ]).exec();
};
