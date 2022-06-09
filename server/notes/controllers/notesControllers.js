const notesController = {};
const Note = require("../models/notesModels");

notesController.createNote = async (req, res) => {
  const { title, description, status, category } = req.body;
  try {
    const data = {
      title,
      description,
      status,
      userId: req.user,
      category,
    };
    let createNote = await new Note(data);
    await createNote.save();
    res.status(200).json({ success: true, notes: createNote });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

notesController.getNotes = async (req, res) => {
  try {
    const allNotes = await Note.find({ userId: req.user });
    res.status(200).json({ success: true, notes: allNotes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

notesController.getSingleNote = async (req, res) => {
  let { noteId } = req.params;
  try {
    const note = await Note.findById({ _id: noteId });
    res.status(200).json({ success: true, note: note });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

notesController.editNote = async (req, res) => {
  let { noteId } = req.params;
  let { title, description, status, category } = req.body;
  console.log(req.body);
  try {
    const preNote = await Note.findById({ _id: noteId });
    const updateNote = await Note.findByIdAndUpdate(
      { _id: noteId },
      {
        $set: {
          title: title ? title : preNote.title,
          description: description ? description : preNote.description,
          status: status ? status : preNote.status,
          category: category ? category : preNote.category,
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, note: updateNote });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

notesController.deleteNote = async (req, res) => {
  let { noteId } = req.params;
  try {
    await Note.findByIdAndRemove({ _id: noteId });
    res.status(200).json({ success: true, note: "Deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = notesController;
