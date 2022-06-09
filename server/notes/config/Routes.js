const express = require("express");

const note = express.Router();

// getting the Notes controller functions from the controller
const notesControllers = require("../controllers/notesControllers");

// creating middleware to verify the user and add to redis cache
const { getUserData } = require("./userVerify");

// adding a middleware to every routes to fetch the userId from user service,

// create Note
note.post("/create-note", getUserData, notesControllers.createNote);
// get all notes of current user
note.get("/all-notes", getUserData, notesControllers.getNotes);
// fetching the single note by it's ID
note.get("/single-note/:noteId", getUserData, notesControllers.getSingleNote);
// updating the Note
note.put("/edit-note/:noteId", getUserData, notesControllers.editNote);
// deleting the note by its ID
note.delete("/delete-note/:noteId", getUserData, notesControllers.deleteNote);

module.exports = note;
