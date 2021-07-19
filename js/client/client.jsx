import React from "https://esm.sh/react?dev&no-check";
import ReactDOM from "https://esm.sh/react-dom?dev&no-check"

import App from "./App.jsx";

window.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <App />,
        document.getElementById("root"),
    );
});

export {};