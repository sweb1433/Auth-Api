const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoryScema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
        unique:true,
    }
},   {timestamps:true}

);

module.exports = mongoose.model("Category",categoryScema);