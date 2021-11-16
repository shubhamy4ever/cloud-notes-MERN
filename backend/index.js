const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongooseUri =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const port = 3000;

app.get("/", (req, res) => {
  res.send("hellua smash!!");
});

mongoose.connect(mongooseUri, () => {
  console.log("connected to mongoose db!!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
