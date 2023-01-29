import React from "react";
//import IDE from "./components/IDE";
// import IDE from "./components/IDE";
import Sample from "./components/Sample";
//import Term from "./components/Term";

const App = () => {
    return (
        <div style={{ width: 800, margin: "0 auto" }}>
            {/* <IDE /> */}
            <Sample />
            {/* 
            <Term cols={80} rows={10} filename={"first"} />
            <Term cols={80} rows={10} filename={"second"} /> */}
        </div>
    );
};

export default App;
