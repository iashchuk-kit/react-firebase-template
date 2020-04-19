import React, { useState, useEffect } from "react";
import { useFirebase } from "./firebase/FirebaseContext";
import styles from "./database.module.scss";

const RealtimeDatabase = () => {
    const [word, setWord] = useState("");
    const [words, setWords] = useState([]);
    const { firestore } = useFirebase();

    useEffect(() => {
        firestore.getWords().then(setWords);
    }, [firestore]);

    const handleAddWord = (evt) => {
        evt.preventDefault();
        firestore.addWord(word).then((newWord) => setWords([...words, newWord]));
        setWord("");
    };

    const handleRemoveWord = (id) => {
        firestore.removeWord(id).then(() => {
            setWords((words) => words.filter((item) => item.id !== id));
        });
    };

    return (
        <div className={styles.database}>
            <h2 className={styles.database__title}>CloudFirestore</h2>
            <form className={styles.database__form}>
                <input
                    className={styles.database__input}
                    value={word}
                    onChange={(evt) => setWord(evt.target.value)}
                />
                <button
                    type={"submit"}
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
                            <span className={styles.database__name}>{word.name}</span>
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
