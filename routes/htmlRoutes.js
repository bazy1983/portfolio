const express = require("express");
const router = express.Router();

const db = require("../models/")

router.get("/", function(req, res){
    db.project.find({})
    .then(function(results){
        console.log(results)
        res.render("index", {projects : results})
    })
})

router.get("/add-project", function(req, res){
    res.render("add", {layout : "addProject.handlebars"})
})


module.exports = router;