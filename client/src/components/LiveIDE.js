import React, { Fragment } from "react";
//import ReactDOM from "react-dom";

import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";

// import Editor from "@monaco-editor/react";
import codes from "./codes";
import IDE from "./IDE";

// const MAX_HEIGHT = 600;
// const MIN_COUNT_OF_LINES = 9;
// const LINE_HEIGHT = 20;

// monaco.config({
//     paths: {
//         vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/vs"
//     }
// });

const LiveIDE = () => {
    // const [height, setHeight] = useState(180);
    // const valueGetter = useRef();

    // const handleEditorChange = useCallback((_) => {
    //     //const countOfLines = valueGetter.current().split("\n").length;
    //     console.dir(valueGetter.current);
    //     // if (countOfLines >= MIN_COUNT_OF_LINES) {
    //     //     const currentHeight = countOfLines * LINE_HEIGHT;
    //     //     if (MAX_HEIGHT > currentHeight) {
    //     //         setHeight(currentHeight);
    //     //     }
    //     // }
    // }, []);

    // const handleEditorDidMount = useCallback(
    //     (editor, monaco) => {
    //         valueGetter.current = monaco;

    //         editor.onDidChangeModelContent(handleEditorChange);
    //         // console.dir(
    //         //     editor
    //         //         .getModel()
    //         //         .getValue()
    //         //         .split("\n").length *
    //         //         2 *
    //         //         10
    //         // );
    //         setHeight(
    //             editor
    //                 .getModel()
    //                 .getValue()
    //                 .split("\n").length *
    //                 2 *
    //                 10
    //         );
    //     },
    //     [handleEditorChange]
    // );

    //const handleHeiht = (editor) => {};
    console.log(`http://${window.location.host}`);

    return (
        <Fragment>
            <Container>
                {codes.map((item, i) => (
                    <IDE item={item} key={i} />
                ))}
            </Container>
        </Fragment>
    );
};

export default LiveIDE;
