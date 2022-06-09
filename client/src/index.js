import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// eslint-disable-next-line
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reducers from "./reducers";

const LocalStoredNotes = localStorage.getItem("MS-notes")
  ? JSON.parse(localStorage.getItem("MS-notes"))
  : {};

const InitialState = {
  NotesReducer: LocalStoredNotes,
};

const middleware = [thunk];

const Store = createStore(
  reducers,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
