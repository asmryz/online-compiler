import React, { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm';
//import { AttachAddon } from "xterm-addon-attach";
import 'xterm/dist/xterm.css';
import * as fit from 'xterm/dist/addons/fit/fit';
import * as attach from 'xterm/dist/addons/attach/attach'
//import { FitAddon } from 'xterm-addon-fit';



const Term = () => {
    const terminal = new Terminal({ cols: 175 });
    window.terminal = terminal;
    const termRef = useRef();
    let terminalContainer = document.getElementById('terminal-container');

    const [pid, setPid] = useState(-1)

    const getTerm = async () => {
        Terminal.applyAddon(fit);
        Terminal.applyAddon(attach);

        terminal.open(termRef);
        console.log(`getTerm`)
        await fetch(`http://localhost:5000/terminals?cols=${terminal.cols}&rows=${terminal.rows}`, { method: 'POST' })
            .then(res => res.text().then(pid => {
                console.log(`pid >> ${pid}`)
                setPid(pid)
                terminal.attach(new WebSocket(`ws://localhost:5000/terminals/${pid}`));
                terminal._initialized = true;
            }));
    }

    useEffect(() => {
        if (pid === -1) {
            (async () => { await getTerm() })();
        }
        terminal.on('resize', (size) => {
            //terminal.resize(size.cols, size.rows);
            console.log(size);
        })

        console.log(terminal._core.options.cols, terminal.cols)
        console.log(terminal)
    }, [])

    return (
        <div ref={termRef} id="terminal-container" />
    )
}

export default Term;




