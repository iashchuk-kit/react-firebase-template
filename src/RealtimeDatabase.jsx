import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useFirebase } from "./firebase/useFirebase";

import styles from "./database.module.scss";

const initialEditState = {
    id: "",
    name: "",
};

const RealtimeDatabase = () => {
    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const [editWord, setEditWord] = useState(initialEditState);
    const { database } = useFirebase();

    useEffect(() => {
        database.getWords().then((snapshot) => {
            const data = snapshot.val() || [];
            setWords(Object.values(data));
        });
    }, [database]);

    const handleAddWord = () => {
        const save = database.addWord();
        const newWord = {
            id: save.key,
            name: word.trim(),
        };
        save.set(newWord).then(() => setWords([...words, newWord]));
        setWord("");
    };

    const saveWord = (savedWord) => {
        if (savedWord.name !== editWord.name.trim()) {
            database.updateWord(editWord).then(() => {
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
        database.removeWord(id).then(() => {
            setWords((words) => words.filter((item) => item.id !== id));
        });
    };

    return (
        <div className={styles.database}>
            <h2>Realtime Database</h2>
            <form className={styles.database__form}>
                <input
                    className={styles.database__input}
                    value={word}
                    onChange={(evt) => setWord(evt.target.value)}
                />
                <button
                    type="submit"
                    className={styles.database__button}
                    disabled={!word}
                    onClick={handleAddWord}
                >
                    Add word
                </button>
            </form>
            <div className={styles.database__wrapper}>
                <ul className={styles.database__list}>
                    {words.map((word) => (
                        <li className={styles.database__item} key={word.id}>
                            <input
                                className={cx(styles.database__text, {
                                    [styles.database__text_edit]: word.id === editWord.id,
                                })}
                                disabled={word.id !== editWord.id}
                                value={word.id === editWord.id ? editWord.name : word.name}
                                onChange={handleEditWord}
                            />
                            <button
                                className={styles.database__toggle}
                                onClick={() => handleSaveEditWord(word)}
                            >
                                {word.id === editWord.id ? "Save" : "Edit"}
                            </button>
                            <button
                                className={styles.database__toggle}
                                onClick={() => handleRemoveWord(word.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RealtimeDatabase;
