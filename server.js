const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");


// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/projectdb'
// module.exports = mongoURI;
// mongoose.connect(mongoURI)

//routes
const htmlRoutes= require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

//Middleware
app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(methodOverride("_method"))

app.use(htmlRoutes)
app.use("/api", apiRoutes);
app.use(fileRoutes)

//HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//exphbs.registerPartial('nav')

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("app is running");
    // console.log(process.env)
})

