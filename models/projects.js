const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let projectSchema = new Schema({
    headline : {
        type : String,
        required : [true, "headline is required field"],
    },
    desc : {
        type: String,
        maxlength: 200
    },
    readme : {
        type: String
    },
    githubLink : {
        type : String,
    },
    herokuLink : {
        type : String
    }

},
{
    timestamps: true
})

let Projects = mongoose.model('project', projectSchema);
module.exports = Projects