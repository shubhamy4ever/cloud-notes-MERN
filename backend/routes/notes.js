const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//fetch notes of the currently logged in user  get request /api/notes/fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//add a note using post request on /api/auth/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 2 }),
    body("description", "Description must be more than 5 length").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        user: req.user.id,
        title: title,
        description: description,
        tag: tag,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
);

//route 3 update notes    put request on  /api/notes/updatenote/id
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
//route 3 delete a  note   delete request on  /api/notes/deletenote/id
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      //if you put return app will not crash else it will
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("unauthorized");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.send("note deleted");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
