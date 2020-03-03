const fs = require("fs");
const path = require("path");
const db = require("../db/db.json")


module.exports = (app) => {
    // * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading db.json file.');
            }
            res.writeHead(200);
            res.end(data);
        });
    });

    // * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function(req, res) {
        // gain access to the db and manipulate the data
        db.push(req.body);
        // fs.writeFile("db.json", newVariable)
        fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        })
        res.json(db);
    });
};
