import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Firebase from "./firebase/Firebase";
import { FirebaseContext } from "./firebase/FirebaseContext";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById("root")
);
