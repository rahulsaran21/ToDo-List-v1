const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req,res) {

    res.render("main");

})

const port = process.env.port || 3000;

app.listen(port, function () {
    console.log("Server running on port 3000.")
})