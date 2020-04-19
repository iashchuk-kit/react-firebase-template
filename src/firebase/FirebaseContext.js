import React, { useContext } from "react";

export const FirebaseContext = React.createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

/*
import Firebase from "./firebase/Firebase";
import { FirebaseContext } from "./firebase/FirebaseContext";

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById("root")
);
*/

/*
import { useFirebase } from "./firebase/FirebaseContext";
const firebase = useFirebase();
*/
