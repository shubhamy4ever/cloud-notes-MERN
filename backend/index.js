const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
const mongooseUri="mongodb+srv://notes:DuLc2GgjKysBxyt@cluster0.s4dmk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = 5000;


//routes
app.use(cors())
app.use(express.json());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

//mongoose connect
mongoose.connect(mongooseUri, () => {
  console.log("connected to mongo db!!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
