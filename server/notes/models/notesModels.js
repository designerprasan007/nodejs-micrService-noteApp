const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const noteSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  status: {
    enum: ["Final", "inProgress", "Review"],
    type: String,
    default: "inProgress",
  },
  userId: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: String,
    trim: true,
  },
});

const Note = mongoose.model("note", noteSchema);
module.exports = Note;
