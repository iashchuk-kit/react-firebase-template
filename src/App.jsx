import React from "react";

import styles from "./app.module.scss";
import RealtimeDatabase from "./RealtimeDatabase";

const App = () => {
    return (
        <div className={styles.app}>
            <h1>React Firebase Template</h1>
            <div className={styles.app__container}>
                <div className={styles.app__block}>
                    <RealtimeDatabase />
                </div>
                <div className={styles.app__block}>
                    <h2>Realtime Firebase</h2>
                </div>
            </div>
        </div>
    );
};

export default App;
