const express = require("express");
const router = express.Router();
const db = require("../models/")

router.post("/addProject", function(req, res){
    db.project.create(req.body)
    .then(function(results){
        res.send(results)
    })
    .catch(function(err){
        console.log("error while adding new project");
        console.log(err);
        res.status(400).end();
    })
})



module.exports = router;