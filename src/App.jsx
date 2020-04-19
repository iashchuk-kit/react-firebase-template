import React from "react";

import RealtimeDatabase from "./RealtimeDatabase";
import CloudFirestore from "./CloudFirestore";

import styles from "./app.module.scss";

const App = () => {
    return (
        <div className={styles.app}>
            <h1>React Firebase Template</h1>
            <div className={styles.app__container}>
                <div className={styles.app__block}>
                    <RealtimeDatabase />
                </div>
                <div className={styles.app__block}>
                    <CloudFirestore />
                </div>
            </div>
        </div>
    );
};

export default App;
