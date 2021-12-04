const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongooseUri =
  "mongodb://localhost:27017/cloudNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const port = 5000;


//routes
app.use(express.json());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

//mongoose connect
mongoose.connect(mongooseUri, () => {
  console.log("connected to mongoose db!!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
