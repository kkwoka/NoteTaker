const path = require("path");

module.exports = (app) => {
    //   * GET `*` - Should return the `index.html` file
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //   * GET `/notes` - Should return the `notes.html` file.
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
};