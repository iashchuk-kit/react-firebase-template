import { useEffect, useMemo } from "react";
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

export const useFirebase = () => {
    useEffect(() => {
        app.initializeApp(config);
    }, []);

    const database = useMemo(() => {
        const getWords = () => app.database().ref("words").once("value");
        const addWord = () => app.database().ref("words").push();
        const removeWord = (id) => app.database().ref(`words/${id}`).remove();
        const updateWord = ({ id, name }) => app.database().ref(`words/${id}`).update({ name });

        return {
            getWords,
            addWord,
            removeWord,
            updateWord,
        };
    }, []);

    return { database };
};
