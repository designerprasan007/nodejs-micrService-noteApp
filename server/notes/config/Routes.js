const express = require("express");

const note = express.Router();
const notesControllers = require("../controllers/notesControllers");
const { getUserData } = require("./userVerify");

note.post("/create-note", getUserData, notesControllers.createNote);
note.get("/all-notes", getUserData, notesControllers.getNotes);
note.get("/single-note/:noteId", getUserData, notesControllers.getSingleNote);
note.put("/edit-note/:noteId", getUserData, notesControllers.editNote);
note.delete("/delete-note/:noteId", getUserData, notesControllers.deleteNote);

module.exports = note;
