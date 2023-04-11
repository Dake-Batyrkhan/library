const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema(
{
    fullname : {
        type : String,
        required : true
    }
}, {timestamps : true});

const Authors= mongoose.model('Author', authorsSchema);
module.exports = Authors;