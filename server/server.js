const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const app = express();
const port = 3000;
app.use(compression());

//for toggle definition refer to toggle file:
const { toggle } = require("../toggle.js");

//My focus for SDC is to build back-end for Review Widget
//require express router for the Review endpoints
const reviews = require("./router/router.js");
app.use("/reviews", reviews);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/reviews/:product_id", (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});
app.use(express.static("./client/dist"));
app.use("/products/:id", express.static("./client/dist"));

//inherited code for cookie creation
app.use(cookieParser());
app.use((req, res, next) => {
  res.cookie("user_id", `${Math.floor(Math.random() * Math.floor(999999))}`);
  next();
});

//listen to the port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
