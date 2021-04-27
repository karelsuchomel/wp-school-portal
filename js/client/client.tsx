import { React, ReactDOM } from "../inc/react.ts";

import App from "./App.tsx";

window.addEventListener("DOMContentLoaded", (evt) => {
    ReactDOM.render(
        <App />,
        // @ts-ignore
        document.getElementById("root"),
    );
});

export {};