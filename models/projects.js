const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    headline : {
        type : String,
        required : [true, "headline is required field"],
        unique : true
    },
    desc : {
        type: String,
        maxlength: 200
    },
    githubLink : {
        type : String,
    },
    herokuLink : {
        type : String
    },
    imgName : {
        type : String
    }

},
{
    timestamps: true
})

let Projects = mongoose.model('project', projectSchema);
module.exports = Projects