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
    }

    database = {
        getWords: async () => {
            const data = await app.database().ref("words").once("value");
            return data ? Object.values(data.val()) : [];
        },
        addWord: async (word) => {
            const push = app.database().ref("words").push();
            const newWord = {
                id: push.key,
                name: word.trim(),
            };
            await push.set(newWord);
            return newWord;
        },
        removeWord: (id) => app.database().ref(`words/${id}`).remove(),
        updateWord: ({ id, name }) => app.database().ref(`words/${id}`).update({ name }),
    };

    firestore = {
        getWords: async () => {
            const snapshot = await app.firestore().collection("words").get();
            return snapshot.docs.map((doc) => doc.data());
        },
        addWord: async (word) => {
            const doc = app.firestore().collection("words").doc();
            const newWord = {
                id: doc.id,
                name: word.trim(),
            };
            await doc.set(newWord, { merge: true });
            return newWord;
        },
        removeWord: (id) => app.firestore().collection("words").doc(id).delete(),
    };
}

export default Firebase;
