 const Category = require("../models/category")
 
 exports.getCategoryById = (req,res,next,id) =>{
     Category.findById(id).exec((err,categ)=>{
        if(err){
            return res.status(400).json({
                error: `category not found as ${err}`
            })
        }
        // similar to profile, category is populated if it is found in db
        req.category = categ
        next()
     })
     
 }

 exports.createCategory = (req,res) =>{
     console.log("i am joker")
     const category = new Category(req.body);
     category.save((error,category)=>{
         if(error){
             return res.status(400).json({
                 error: "Not able to save category in DB"
             });
         }
         res.json({category})
     });
 };


 exports.getCategory = (req,res) =>{
    //  since getcategoryById is already populating in req.category objevt
    return res.json(req.category)
 }

 exports.getAllCategory = (req,res) =>{
     Category.find().exec((err,categories) =>{
         if(err){
             return res.status(400).json({
                 error: "No category found"
             })
         }
         res.json(categories)
     })
}

exports.updateCategory = (req,res) =>{
    console.log("i am joker")
    //  since getcategoryById is already populating in req.category objevt
    const category = req.category
    category.name = req.body.name

    category.save((err,updatedCategory) =>{
        if(err){
            return res.status(400).json({
                error: `failed to update catogery as ${err}`
            });
        }
        res.json(updatedCategory)
    });
}

exports.removeCategory = (req,res) =>{
    //  since getcategoryById is already populating in req.category objevt
    const category = req.category
    category.name = req.body.name

    category.remove((err,category) =>{
        if(err){
            return res.status(400).json({
                error: "failed to delete catogery"
            });
        }
        res.json({
            message: `${req.body.name} Successfully deleted`
        })
    });
}