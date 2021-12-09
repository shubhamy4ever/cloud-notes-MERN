const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:"user"
    },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", notesSchema);
