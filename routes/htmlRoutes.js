const express = require("express");
const router = express.Router();
const db = require("../models/")

router.get("/", function(req, res){
    res.send("okay")
})

router.get("/add-project", function(req, res){
    res.render("add")
})


module.exports = router;