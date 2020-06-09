const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const Schema = mongoose.Schema;

const productScema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
    },
    description: {
        type:String,
        required:true,
        maxlength:2000,
        trim:true, 
    },
    price: {
        type:Number,
        required:true,
        maxlength:32,
    },
    category: {
        type:ObjectId,
        ref:"Categary",
        required:true
    },
    stock: {
        type:Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    // color:{
    //     type:String,
    //     required:true
    // }
},{timestamps:true});

 

  module.exports = mongoose.model("Product",productScema);