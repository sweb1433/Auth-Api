const Product = require("../models/product")
const Formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")


 
 exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=> {
        if(err){
            return res.status(400).jspn({
                error : "product not found"
            })
        }
        req.product = product
        next();
    })
 }

 exports.createProduct = (req,res) =>{
    let form  = Formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err,fields,file) => {
        if(err){
            return res.status(400).jspn({
                error : "problem with image:"
            })
        }

        // Destructure the feilds
        const {price,name,description,category,stock} = fields

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock 
        ){
            return res.status(400).json({
                error : "Please include all feilds"
            })
        }

        let product = new Product(fields)

        // handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "file size too big!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // save to db

        product.save((err, product)=> {
            if(err){
                return res.status(400).json({
                    error: `saving tshirt in db failed! reson is ${err}`
                })
            }
            // product.photo = undefined
            res.json(product)
        })
    })
 }