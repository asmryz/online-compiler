import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/dist/xterm.css";
import * as fit from "xterm/lib/addons/fit/fit";
//import { FitAddon } from "xterm-addon-fit";

const Term = ({ cols }) => {
    const terminal = new Terminal({ cols });
    const termRef = useRef();
    window.terminal = terminal;
    console.log(`cols >> ${cols}`);
    const [pid, setPid] = useState(-1);

    const getTerm = async () => {
        Terminal.applyAddon(fit);
        console.log(`getTerm`);
        await fetch(`http://localhost:5000/terminals?cols=${terminal.cols}&rows=${terminal.rows}`, {
            method: "POST",
        }).then((res) =>
            res.text().then((pid) => {
                console.log(`pid >> ${pid}`);
                setPid(pid);

                terminal.loadAddon(new AttachAddon(new WebSocket(`ws://localhost:5000/terminals/${pid}`)));
                terminal.open(termRef.current);
                console.log(termRef.current.offsetWidth);
            })
        );
    };

    useEffect(() => {
        if (pid === -1) {
            (async () => {
                await getTerm();
            })();
        }
    }, []);

    return <div ref={termRef} id="terminal-container" />;
};

export default Term;
