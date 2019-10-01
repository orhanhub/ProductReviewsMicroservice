//Import express Router
const express = require("express");
const router = express.Router();
//Import controller dependencies
const {
  retrieveList,
  retrieveMeta,
  retrieveOneList
} = require("../controller/index");

//Defined Routes below:
router.get("/:product_id/list", retrieveList);
router.get("/:product_id/meta", retrieveMeta);
router.get("/:product_id/test", retrieveOneList);

// router.post("/:product_id", postReview);
//TODO: build these routes
//router.post("/report/:review_id", reportReview)
//router.post("/helpful/:review_id", helpfulReview)

module.exports = router;
