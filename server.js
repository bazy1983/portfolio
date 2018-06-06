const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const htmlRoutes= require("./routes/htmlRoutes")

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(htmlRoutes)

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("app is running");
})