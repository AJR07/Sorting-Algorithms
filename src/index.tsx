import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WordCloud from "./main";

// root of the app
// renders the entire app in the div with id "root"
ReactDOM.render(
    <React.StrictMode>
        <WordCloud />
    </React.StrictMode>,
    document.getElementById("root")
);
