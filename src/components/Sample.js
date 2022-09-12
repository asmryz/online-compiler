import React, { useState, useCallback, useRef } from "react";
//import ReactDOM from "react-dom";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Editor from "@monaco-editor/react";
import examples from "./examples";

const MAX_HEIGHT = 600;
const MIN_COUNT_OF_LINES = 9;
const LINE_HEIGHT = 20;

// monaco.config({
//     paths: {
//         vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/vs"
//     }
// });

const Sample = () => {
    const [height, setHeight] = useState(325);
    const valueGetter = useRef();

    const handleEditorChange = useCallback(_ => {
        const countOfLines = valueGetter.current().split("\n").length;
        console.log(`countOfLines >> ${countOfLines}`)
        if (countOfLines >= MIN_COUNT_OF_LINES) {
            const currentHeight = countOfLines * LINE_HEIGHT;
            if (MAX_HEIGHT > currentHeight) {
                setHeight(currentHeight);
            }
        }
    }, []);

    const handleEditorDidMount = useCallback(
        (_valueGetter, editor) => {
            valueGetter.current = _valueGetter;
            editor.onDidChangeModelContent(handleEditorChange);
            console.log(`countOfLines >> ${valueGetter.current().split("\n").length}`)
        },
        [handleEditorChange]
    );

    return (
        // <Container>
        //     <Paper>
        <Editor
            height={height}
            editorDidMount={handleEditorDidMount}
            language="python"
            value={examples.python}
            scrollBeyondLastLine='false'
        />
        //     </Paper>
        // </Container>
    );
}

export default Sample
