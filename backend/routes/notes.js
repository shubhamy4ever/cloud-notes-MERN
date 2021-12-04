const express = require("express");
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser=require("../middleware/fetchuser");

//fetch notes of the currently logged in user  get request
router.get("/fetchnotes",fetchuser, async (req,res)=>{
const notes = await Notes.findById(req.user.id);
res.json(notes);
})
module.exports=router;