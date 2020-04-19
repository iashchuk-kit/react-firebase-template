import app from "firebase/app";
import "firebase/database";
import "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_KEY,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.database = app.database();
        this.firestore = app.firestore();
    }

    getWords = () => this.database.ref("words").once("value");
    addWord = () => this.database.ref("words").push();
    removeWord = (id) => this.database.ref(`words/${id}`).remove();
    updateWord = (id, name) => this.database.ref(`words/${id}`).update({ name });
}

export default Firebase;
