const express = require("express");
const router = express.Router();
const db = require("../models/")
const mongoose = require("mongoose");
const multer = require("multer");
const grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");

// const mongoURI = require("../server")
mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/projectdb'

//setup db to accept file uploads
mongoose.connect(mongoURI)
const conn = mongoose.connection;



//setup grid
let gfs;
grid.mongo = mongoose.mongo;
conn.once("open", function () {
  //init stream
  gfs = grid(conn.db);
  gfs.collection("uploads")
})

//storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });



//Routes

router.post("/add-new-project", upload.single("file"), function(req, res){
    let myProject = req.body;
    myProject.imgName = req.file.filename
    db.project.create(myProject)
    .then(function(){
        res.send("okay")
    })
    .catch(function(err){
        console.log(err)
        res.status(500).json({err : "some error"})
    })
})

router.get("/files", function(req, res){
  db.project.find({})
  .then(function(results){
    res.render("images", {
      layout : "addProject.handlebars",
      projects : results
    })
  })
})




//this route is important to read file stream
router.get("/image/:filename", function (req, res) {
  gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: "not found" })
    }
    if (file.contentType === "image/jpeg" || file.contentType === "image/png" || file.contentType === "image/gif") {

      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({err : "not an image"});
    }
    
  })
})






module.exports = router;