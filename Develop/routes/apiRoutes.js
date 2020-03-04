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
        db.push(req.body);
        fs.writeFile("Develop/db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        })
        res.json(db);
    });

    // * DELETE `/api/notes/:id` - Should remove the note with the given `id` property, rewrite the notes to the `db.json` file.
    app.delete("/api/notes/:id", function (req, res) {
        let noteID = req.params.id;

        for (let i=0; i < db.length; i++) {
            if (i === parseInt(noteID)) {
                console.log("delete this: ", db[i]);
                //Remove 1 element at index db[i]
                db.splice(parseInt(noteID), 1);
            }
        }

        fs.writeFile("Develop/db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        });

        res.json(db);
      });
};