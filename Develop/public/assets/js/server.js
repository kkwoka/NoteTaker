// Dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = 3010;

// data from json.db
const notes = [];

//   * GET `*` - Should return the `index.html` file
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "../../../db/db.json"), function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading db.json file.');
        }
        res.writeHead(200);
        res.end(data);
    });
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  