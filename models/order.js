const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const Schema = mongoose.Schema;

const ProductCartSchema = new Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number

})

const ProductCart = mongoose.model("ProductCart",ProductCartSchema)
const orderScema = new Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:String,
    updated: Date,
    user: {
        type:ObjectId,
        ref:"User"
    }
},   {timestamps:true});

 

const Order = mongoose.model("Order",orderScema)

module.exports = {Order,ProductCart}