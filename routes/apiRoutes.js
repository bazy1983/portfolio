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
conn.once("open", function(){
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
  const upload = multer({storage});
  


  //Routes
  router.post("/upload", upload.single("file"), function(req, res){
      //console.log(req.file)
      res.json(req.file)
  })

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

router.get("/files", function(req, res){
  gfs.files.find().toArray(function(err, files){
    if(!files || files.length === 0){
      return res.status(404).json({err : "not found"})
    }
    return res.json(files)
  })
})




module.exports = router;