import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Term from "./Term";
import { Paper } from "@material-ui/core";
import api from "../api";

//const rTabs = (str) => str.trim().replace(/^ {4}/gm, "");

const IDE = ({ item }) => {
    const editorRef = useRef(null);
    const [execute, setExecute] = useState(0);

    // const item = {
    //     filename: "src-1",
    //     extention: ".c",
    //     language: "c",
    //     code: rTabs(`
    // #include<stdio.h>

    // int main()
    // {
    //     int i;
    //     for(i=0; i<=5; i++)
    //     {
    //             printf("%d\\n", i);
    //     }
    //     return 0;
    // }
    //         `),
    // };

    function handleEditorDidMount(editor, monaco) {
        editor.getModel().updateOptions({ tabSize: 4 });
        editor.getAction("editor.action.formatDocument").run();
        editorRef.current = editor;
    }

    function showValue() {
        console.log(editorRef.current.getValue());
        setExecute(0);
        api.post("/save", {
            src: editorRef.current.getValue(),
            extention: item.extention,
            filename: item.filename,
        }).then((res) => {
            if (res.data === "saved") {
                setExecute(1);
            }
        });
    }

    let bookmark = "#!";
    //console.log(`height >> ${item.code.split("\n").length * 2 * 10}`);
    return (
        <Paper>
            <a href={bookmark} onClick={showValue}>
                compile
            </a>
            <Editor
                //height={item.code.split("\n").length * 2 * 10 < 300 ? item.code.split("\n").length * 2 * 10 : 300}
                height={300}
                onMount={handleEditorDidMount}
                language={item.language}
                value={item.code}
                scrollBeyondLastLine="false"
                options={{
                    readOnly: false,
                    minimap: { enabled: false },
                    scrollbars: false,
                }}
            />
            output:
            <div style={{ width: 760, height: 200, backgroundColor: "#0000AA" }}>
                {execute !== 0 ? <Term cols={80} rows={10} filename={item.filename} execute={execute} /> : null}
            </div>
        </Paper>
    );
};
export default IDE;
