import React, { useEffect, useState } from "react";
// import IDE from "./components/IDE";
// import Sample from "./components/Sample";
import Term from "./components/Term";

const App = () => {
    const divRef = React.useRef();

    const [cols, setCols] = useState(0);
    useEffect(() => {
        //if (divRef.current) {
        console.log(divRef.current.clientWidth);
        setCols(parseInt(divRef.current.clientWidth / 9));
        //}
    }, []);

    return (
        <div>
            {/* <Sample /> */}
            <div ref={divRef}>{cols !== 0 && <Term cols={cols} />}</div>
        </div>
    );
};

export default App;
