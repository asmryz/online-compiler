"use strict";
exports.__esModule = true;
var express = require("express");
var pty = require("node-pty");
var app = express();
var expressWs = require('express-ws')(app);
// Serve static assets from ./static
app.use(express.static(__dirname + "/static"));

var terminals = {};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Instantiate shell and set up data handlers
expressWs.app.ws('/terminals/:pid', function (ws, req) {
    var term = terminals[parseInt(req.params.pid)];
    // Spawn the shell
    // Compliments of http://krasimirtsonev.com/blog/article/meet-evala-your-terminal-in-the-browser-extension
    // var term = pty.spawn('/bin/bash', [], {
    //     name: 'xterm-color',
    //     cwd: process.env.PWD,
    //     env: process.env
    // });

    // console.log('Created terminal with PID: ' + term.pid);
    // terminals[term.pid] = term;

    // res.send(term.pid.toString());
    // res.end();


    // For all shell data send it to the websocket
    term.on('data', function (data) {
        ws.send(data);
    });
    // For all websocket data send it to the shell
    ws.on('message', function (msg) {
        term.write(msg);
    });
});


app.post('/terminals', function (req, res) {
    console.log(req.query)
    var cols = parseInt(req.query.cols),
        rows = parseInt(req.query.rows),
        //term = pty.spawn('docker', ['exec', '-it', 'app', 'bash'], {
        term = pty.spawn('bash', [], {
            name: 'xterm-color',
            cols: cols || 80,
            rows: rows || 24,
            cwd: process.env.PWD,
            env: process.env
        });
    //term.write('ls\r');
    console.log('Created terminal with PID: ' + term.pid);
    terminals[term.pid] = term;

    res.send(term.pid.toString());
    res.end();
});

app.post('/terminals/:pid/size', function (req, res) {
    var pid = parseInt(req.params.pid),
        cols = parseInt(req.query.cols),
        rows = parseInt(req.query.rows),
        term = terminals[pid];

    term.resize(cols, rows);
    console.log('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.');
    res.end();
});
// Start the application
app.listen(5000, () => console.log(`Server is listening on https://localhost:5000`));
