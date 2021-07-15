import { React, ReactDOM } from "../inc/react.js";

import App from "./App.jsx";

window.addEventListener("DOMContentLoaded", (evt) => {
    ReactDOM.render(
        <App />,
        // @ts-ignore
        document.getElementById("root"),
    );
});

export {};