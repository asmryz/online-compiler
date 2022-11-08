import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import Term from "./Term";

const IDE = () => {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        console.log(editorRef.current.getValue());
    }

    return (
        <>
            {/* <button onClick={showValue}>Show value</button>
            <Editor
                height="90vh"
                defaultLanguage="c"
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                options={{
                    readOnly: false,
                    minimap: { enabled: false },
                    scrollbars: false,
                }}
            /> */}
            <Term />
        </>
    );
};
export default IDE;
