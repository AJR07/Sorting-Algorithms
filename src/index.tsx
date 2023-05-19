import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import SortingVisualiser from "./main";

// root of the app
// renders the entire app in the div with id "root"
ReactDOM.render(
    <React.StrictMode>
        <SortingVisualiser />
    </React.StrictMode>,
    document.getElementById("root")
);
