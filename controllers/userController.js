const User = require("../models/users")

exports.getUserById = (req,res,next,id)=>{
        User.findById(id).exec((err,succ)=>{
            if(err || !succ){
                return res.status(400).json({
                    error:"User Was not found"
                })
            }
            req.profile = succ;
            next();
        });  
}

exports.getUserById = (req,res)=>{
    // TODO:get here
    
        req.profile = succ;
        next();
      
}