import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseContext } from "./Store/Context";
import { auth } from "./Firebase/config";
import Context from "./Store/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={{ auth }}>
    <Context>
      <App />
    </Context>
  </FirebaseContext.Provider>
);
