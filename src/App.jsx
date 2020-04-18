import React, { useState, useEffect } from "react";
import { useFirebase } from "./firebase/FirebaseContext";

import styles from "./styles.module.scss";

const App = () => {
    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const firebase = useFirebase();

    useEffect(() => {
        firebase.getWords().then((snapshot) => {
            const data = snapshot.val() || [];
            setWords(Object.values(data));
        });
    }, [firebase]);

    const handleSaveWord = () => {
        const save = firebase.addWord();
        const newWord = {
            id: save.key,
            name: word,
        };
        save.set(newWord).then(() => setWords([...words, newWord]));
        setWord("");
    };

    const handleRemoveWord = (id) => {
        firebase.removeWord(id).then(() => {
            setWords((words) => words.filter((item) => item.id !== id));
        });
    };

    return (
        <div className={styles.app}>
            <h1>React Firebase Template.</h1>
            <div className={styles.app__container}>
                <div className={styles.app__block}>
                    <h2>Realtime Database</h2>
                    <input
                        className={styles.app__input}
                        value={word}
                        onChange={(evt) => setWord(evt.target.value)}
                    />
                    <button
                        className={styles.app__button}
                        disabled={!word}
                        onClick={handleSaveWord}
                    >
                        Save word
                    </button>
                    <div className={styles.app__wrapper}>
                        <ul className={styles.app__list}>
                            {words.map((item) => (
                                <li key={item.id} onDoubleClick={() => handleRemoveWord(item.id)}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.app__block}>
                    <h2>Realtime Firebase</h2>
                </div>
            </div>
        </div>
    );
};

export default App;
