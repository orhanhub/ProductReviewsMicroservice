const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const app = express();
const port = 3000;

app.use(compression());

app.use(express.static("./client/dist"));
app.use("/products/:id", express.static("./client/dist"));
app.use(cookieParser());
app.use((req, res, next) => {
  res.cookie("user_id", `${Math.floor(Math.random() * Math.floor(999999))}`);
  next();
});

app.get("/", (req, res) => {
  console.log("Cookies: ", req.cookies);
  res.cookie("yo", "test");
  res.send("Hello World!");
});
app.get("/cookies", (req, res) => {
  // res.cookie('hi', 'alue');
  res.send(req.cookies);
});
// app.get('/products/:id',
//   (req, res) => {
//     res.sendFile(path.join(__dirname, './../client/dist/index.html'));
//   });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//
