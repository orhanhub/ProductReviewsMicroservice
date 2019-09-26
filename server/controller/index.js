//Import dependencies from model;
const {
  retrieveListQuery,
  characteristics,
  ratings,
  recommended
} = require("../model/index");

//TODO: post controllers to be built below:

//router.post("/report/:review_id", reportReview)
//router.post("/helpful/:review_id", helpfulReview)

//Retrieve List of Reviews:
exports.retrieveList = (req, res) => {
  let parameter = req.params.product_id;
  retrieveListQuery(parameter)
    .then(result => {
      let modifiedresult = {
        product: parameter,
        results: result
      };
      res.status(200).send(modifiedresult);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("an internal error occurred");
    });
};

//Retrieve List of Meta
// Meta is split into 3 queries to decrease the query response time
//   the query responses are modified here to meet the original API endpoints;

//But, to modify the data need to tap into the power of helper functions

let arraytoratings = queryarray => {
  let output = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (let i of queryarray)
    if (output[i._id] !== undefined) output[i._id] += i.count;
  return output;
};

let arraytorecommended = queryarray => {
  let interim = { false: 0, true: 0 };
  for (let i of queryarray)
    if (interim[i._id] !== undefined) interim[i._id] += i.count;
  let output = { 0: interim.false, 1: interim.true };
  return output;
};

let arraytocharacteristics = queryarray => {
  let result = {};
  for (let i of queryarray) {
    result[i.name] = { id: i._id, value: i.average };
  }
  return result;
};
//end of helper functions

exports.retrieveMeta = (req, res) => {
  let parameter = req.params.product_id;

  Promise.all([
    characteristics(parameter),
    ratings(parameter),
    recommended(parameter)
  ])
    .then(result => {
      let modifiedresult = {};
      modifiedresult.product_id = parameter;
      modifiedresult.characteristics = arraytocharacteristics(result[0]);
      modifiedresult.ratings = arraytoratings(result[1]);
      modifiedresult.recommended = arraytorecommended(result[2]);
      // console.log(modifiedresult);
      res.send(modifiedresult);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("an internal error occurred");
    });
};

exports.postReview = (req, res) => {};

//TODO: Post Report
exports.postRepot = (req, res) => {};

//TODO: Post Helpfulness
exports.postHelpfulness = (req, res) => {};
