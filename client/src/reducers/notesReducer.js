export const NotesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_NOTES":
      return { allNotes: action.payload };
    case "CREATE_NEW_NOTE":
      return { storeSuccess: action.payload };
    case "EDIT_NOTE":
      return { editSuccess: action.payload };
    case "DELETE_NOTE":
      return { DeleteSuccess: action.payload };
    default:
      return state;
  }
};
