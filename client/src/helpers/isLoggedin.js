export const isLoggedIn = () => {
  if (typeof window == "undefined") {
    return false;
  } else {
    const checkToken = localStorage.getItem("notes-ms");
    if (checkToken && checkToken !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
};
