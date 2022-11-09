import React, { useEffect, useState } from "react";
// import IDE from "./components/IDE";
// import Sample from "./components/Sample";
import Term from "./components/Term";

const App = () => {
    const divRef = React.useRef();

    const updateCols = () => {
        setCols(parseInt(divRef.current.clientWidth / 9));
    };

    const [cols, setCols] = useState(0);
    useEffect(() => {
        //if (divRef.current)
        //console.log(sessionStorage.getItem("pid"));
        //if (sessionStorage.getItem("pid") === null) {
        console.log(divRef.current.clientWidth);
        updateCols();
        //}
        //}
    }, []);

    useEffect(() => {
        window.addEventListener("resize", updateCols);
    });

    return (
        <div style={{ width: 800, margin: "0 auto" }}>
            {/* <Sample /> */}
            <div ref={divRef}>
                {cols !== 0 && (
                    <Term cols={cols} rows={15} created={sessionStorage.getItem("pid") === null ? false : true} />
                )}
            </div>
        </div>
    );
};

export default App;
