import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";

import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Notes/Dashboard/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
