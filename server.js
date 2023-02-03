"use strict";
exports.__esModule = true;
var express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config();
var pty = require("node-pty");
var app = express();
var expressWs = require("express-ws")(app);
// Serve static assets from ./static
app.use(express.json());
app.use(express.static(__dirname + "/static"));

var terminals = {};
var args = [];
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Instantiate shell and set up data handlers
expressWs.app.ws("/terminals/:pid", function(ws, req) {
    var term = terminals[parseInt(req.params.pid)];

    term.on("data", function(data) {
        ws.send(data);
    });
    // For all websocket data send it to the shell
    ws.on("message", function(msg) {
        term.write(msg);
    });
});

app.post("/save", (req, res) => {
    console.log(`first`);
    console.log(req.body);
    const outputPath = "/home/asmryz/git/C/";
    const { src, extention, filename } = req.body;
    // code that generates names and content

    const currentFile = `${outputPath}${filename}${extention}`;
    //const content = "...";
    fs.promises.writeFile(currentFile, src, "utf8");
    res.send("saved");
});

//docker run -itd --rm --name c-compiler gcc /bin/bash
app.post("/terminals", async function(req, res) {
    console.log(
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
    );

    console.log(req.query);
    console.log(` src >> ${req.query.src}`);
    //let args = ["exec", "-ti", "c-compiler", "bash", "-c", "gcc -o second second.c && ./second"];

    args = [
        "run",
        "--rm",
        "-it",
        "-v",
        "/home/asmryz/git/C:/usr/src/myapp",
        "-w",
        "/usr/src/myapp",
        "gcc:4.9",
        "bash",
        "-c",
        //`gcc -o second second.c && ./second`,
        `gcc -o ${req.query.src} ${req.query.src}.c && ./${req.query.src}`,
    ];
    var cols = parseInt(req.query.cols);
    var rows = parseInt(req.query.rows);

    var term = pty.spawn("docker", args, {
        //term = pty.spawn("docker", args, {
        name: "xterm-color",
        cols: cols || 80,
        rows: rows || 24,
        cwd: process.env.PWD,
        env: process.env,
    });
    //term.write("ls\r");
    console.log("Created terminal with PID: " + term.pid);
    console.log(
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`
    );
    terminals[term.pid] = term;

    res.send(term.pid.toString());
    res.end();
});

app.post("/terminals/:pid/size", function(req, res) {
    var pid = parseInt(req.params.pid),
        cols = parseInt(req.query.cols),
        rows = parseInt(req.query.rows),
        term = terminals[pid];

    //term.resize(cols, rows);
    //term.write("ls\r");
    console.log("Resized terminal " + pid + " to " + cols + " cols and " + rows + " rows.");
    res.status(200).send(pid);
    res.end();
});
const port = process.env.PORT || 8000;
const host = process.env.HOST || "localhost";
// Start the application
app.listen(port, () => console.log(`Server is listening on http://${host}:${port}`));
