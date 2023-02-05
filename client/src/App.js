import React from "react";
import ReactDOM from "react-dom";
import IDE from "./components/IDE";
import LiveIDE from "./components/LiveIDE";
import Term from "./components/Term";

const App = () => {
    const getAPI = () => {
        fetch("/msg", { method: "GET" })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };
    let href = "#";
    return (
        <div style={{ width: 800, margin: "0 auto" }}>
            <LiveIDE />
        </div>
    );
};

export default App;
