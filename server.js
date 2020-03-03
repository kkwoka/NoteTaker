// Dependencies
var express = require("express");

// var db = require("../../../db/db");

// Sets up the Express App
let app = express();
let PORT = process.env.PORT || 3010;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

require("./Develop/routes/apiRoutes")(app);
require("./Develop/routes/htmlRoutes")(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});