import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { AttachAddon } from "xterm-addon-attach";
import "xterm/dist/xterm.css";
import * as fit from "xterm/lib/addons/fit/fit";
//import { FitAddon } from "xterm-addon-fit";

const Term = ({ cols, rows, created, filename, execute }) => {
    const terminal = new Terminal({ cols, rows });
    const termRef = useRef();
    window.terminal = terminal;
    console.log(`cols >> ${cols}`);
    const [pid, setPid] = useState(sessionStorage.getItem("pid") || -1);

    const getTerm = async () => {
        Terminal.applyAddon(fit);
        console.log(
            `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
        );
        console.log(`getTerm`);
        await fetch(
            `http://localhost:5000/terminals?cols=${terminal.cols}&rows=${terminal.rows}&pid=${pid}&src=${filename}`,
            {
                method: "POST",
            }
        ).then((res) =>
            res.text().then((pid) => {
                console.log(
                    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
                );
                console.log(`pid >> ${pid}`);
                setPid(pid);
                sessionStorage.setItem("pid", pid);

                terminal.loadAddon(new AttachAddon(new WebSocket(`ws://localhost:5000/terminals/${pid}`)));
                terminal.open(termRef.current);
                //console.log(termRef.current.offsetWidth);
            })
        );
    };

    useEffect(() => {
        (async () => {
            await getTerm();
        })();
    }, [execute]);

    return <div ref={termRef} id="terminal-container" />;
};

export default Term;
