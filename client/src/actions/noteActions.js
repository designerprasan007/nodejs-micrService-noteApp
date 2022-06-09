import axios from "axios";
const END_POINT = "http://localhost:5002/notes/";
export const getAllNotesAction = () => async (dispatch) => {
  try {
    let token = JSON.parse(localStorage.getItem("notes-ms"));
    let allNotes = await axios.get(`${END_POINT}all-notes`, {
      headers: {
        noteService: token.token,
      },
    });
    localStorage.setItem("MS-notes", JSON.stringify(allNotes.data.notes));
    dispatch({ type: "GET_ALL_NOTES", payload: allNotes.data.notes });
  } catch (err) {
    console.log(err);
  }
};

export const createNewNoteAction = (formData) => async (dispatch, getState) => {
  let token = JSON.parse(localStorage.getItem("notes-ms"));
  try {
    let {
      NotesReducer: { allNotes },
    } = getState();

    let newNote = await axios.post(`${END_POINT}create-note`, formData, {
      headers: {
        noteService: token.token,
      },
    });
    allNotes = [...allNotes, newNote.data.notes];
    dispatch({ type: "GET_ALL_NOTES", payload: allNotes });
  } catch (err) {
    console.log(err);
  }
};

export const editNoteAction = (formData, id) => async (dispatch, getState) => {
  let token = JSON.parse(localStorage.getItem("notes-ms"));
  try {
    const {
      NotesReducer: { allNotes },
    } = getState();
    let editedNote = await axios.put(`${END_POINT}edit-note/${id}`, formData, {
      headers: {
        noteService: token.token,
      },
    });
    // eslint-disable-next-line
    allNotes.map((val) => {
      if (val._id === id) {
        val.title = editedNote.data.note.title;
        val.category = editedNote.data.note.category;
        val.description = editedNote.data.note.description;
        val.status = editedNote.data.note.status;
      }
    });
    dispatch({ type: "GET_ALL_NOTES", payload: allNotes });
  } catch (err) {
    console.log(err);
  }
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  let token = JSON.parse(localStorage.getItem("notes-ms"));
  try {
    let {
      NotesReducer: { allNotes },
    } = getState();
    await axios.delete(`${END_POINT}delete-note/${id}`, {
      headers: {
        noteService: token.token,
      },
    });
    allNotes = allNotes.filter((val) => val._id !== id);
    dispatch({ type: "GET_ALL_NOTES", payload: allNotes });
  } catch (err) {
    console.log(err);
  }
};
