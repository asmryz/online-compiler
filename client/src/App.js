import React from "react";
import ReactDOM from "react-dom";
import IDE from "./components/IDE";
import LiveIDE from "./components/LiveIDE";
import ScrollSpy from "./components/ScrollSpy";
import Term from "./components/Term";

const App = () => {
    // const getAPI = () => {
    //     fetch("/msg", { method: "GET" })
    //         .then((res) => res.json())
    //         .then((data) => console.log(data));
    // };
    let href = "#";
    return (
        // <ScrollSpy />
        // <div style={{ width: 1200, margin: "0 auto" }}>
        <LiveIDE />
        // </div>
    );
};

export default App;
