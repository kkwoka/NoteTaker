const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
let id = db.length; //Each new note will generate a new id #


module.exports = (app) => {
    // * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", function(req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading db.json file.');
            }
            // console.log("GET data:", data);
            return res.end(data);
        });
    });

    // * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function(req, res) {
        req.body.id = ++id;
        db.push(req.body);
        fs.writeFile("Develop/db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
            // console.log("db var: ", db);
            console.log("id: ",req.body.id)

            return res.json(db);
        })
    });

    // * DELETE `/api/notes/:id` - Should remove the note with the given `id` property, rewrite the notes to the `db.json` file.
    app.delete("/api/notes/:id", function (req, res) {
        let noteID = req.params.id;

        for (let i=0; i < db.length; i++) {
            if (db[i].id === parseInt(noteID)) {
                console.log("Does ", i, "= ", db[i].id, "= ", parseInt(noteID));
                console.log("delete this: ", db[i]);
                // console.log("noteID: ", parseInt(noteID))
                //Remove 1 element at index db[i]
                db.splice(i, 1);
            }
        }

        fs.writeFile("Develop/db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;

            return res.json(db);
        });
      });
};