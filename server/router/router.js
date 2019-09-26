//Import express Router
const express = require("express");
const router = express.Router();
//Import controller dependencies
const {
  retrieveList,
  retrieveMeta,
  postReview
} = require("../controller/index");

//Defined Routes below:
router.get("/:product_id/list", retrieveList);
router.get("/:product_id/meta", retrieveMeta);
// router.post("/:product_id", postReview);
//TODO: build these routes
//router.post("/report/:review_id", reportReview)
//router.post("/helpful/:review_id", helpfulReview)

module.exports = router;
