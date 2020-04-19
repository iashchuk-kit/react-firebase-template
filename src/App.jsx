import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useFirebase } from "./firebase/FirebaseContext";

import styles from "./styles.module.scss";

const initialEditState = {
    id: "",
    name: "",
};

const App = () => {
    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const [editWord, setEditWord] = useState(initialEditState);
    const firebase = useFirebase();

    useEffect(() => {
        firebase.getWords().then((snapshot) => {
            const data = snapshot.val() || [];
            setWords(Object.values(data));
        });
    }, [firebase]);

    const handleAddWord = () => {
        const save = firebase.addWord();
        const newWord = {
            id: save.key,
            name: word,
        };
        save.set(newWord).then(() => setWords([...words, newWord]));
        setWord("");
    };

    const saveWord = (savedWord) => {
        if (savedWord.name !== editWord.name) {
            firebase.updateWord(editWord).then(() => {
                setWords((words) =>
                    words.map((savedWord) =>
                        savedWord.id === editWord.id
                            ? { ...savedWord, name: editWord.name }
                            : savedWord
                    )
                );
                setEditWord(initialEditState);
            });
            return;
        }
        setEditWord(initialEditState);
    };

    const handleEditWord = (evt) => {
        const name = evt.target.value;
        setEditWord((current) => ({ ...current, name }));
    };

    const handleSaveEditWord = (item) => {
        const saveMode = editWord.id === item.id;
        return saveMode ? saveWord(item) : setEditWord(item);
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
                    <form>
                        <input
                            className={styles.app__input}
                            value={word}
                            onChange={(evt) => setWord(evt.target.value)}
                        />
                        <button
                            type="submit"
                            className={styles.app__button}
                            disabled={!word}
                            onClick={handleAddWord}
                        >
                            Add word
                        </button>
                    </form>
                    <div className={styles.app__wrapper}>
                        <ul className={styles.app__list}>
                            {words.map((word) => (
                                <li className={styles.app__item} key={word.id}>
                                    <input
                                        className={cx(styles.app__text, {
                                            [styles.app__text_edit]: word.id === editWord.id,
                                        })}
                                        disabled={word.id !== editWord.id}
                                        value={word.id === editWord.id ? editWord.name : word.name}
                                        onChange={handleEditWord}
                                    />
                                    <button
                                        className={styles.app__toggle}
                                        onClick={() => handleSaveEditWord(word)}
                                    >
                                        {word.id === editWord.id ? "Save" : "Edit"}
                                    </button>
                                    <button
                                        className={styles.app__toggle}
                                        onClick={() => handleRemoveWord(word.id)}
                                    >
                                        Remove
                                    </button>
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
