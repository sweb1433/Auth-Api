const User = require("../models/users")

exports.getUserById = (req,res,next,id)=>{
        User.findById(id).exec((err,succ)=>{
            if(err || !succ){
                return res.status(400).json({
                    error:"User Was not found"
                })
            }
            //we are creating an object named profile to store user info if user is found
            req.profile = succ;
            next();
        });  
}

exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,succ) =>{
            if(err){
                return res.status(400).json({
                    error : "You are not authorized to update this"
                })
            }
            succ.salt = undefined
            succ.encry_password = undefined
            res.json(succ)
        }
    )
}

// exports.getUsers = (req,res)=>{
//     User.find((err,succ)=>{
//         if(err || !succ){
//             return res.status(400).json({
//                 error:"User Was not found"
//             })
//         }
//         return res.json(succ)
//     })
// }

exports.getUser = (req,res)=>{
    // TODO:get here back for password
        req.profile.salt = undefined
        req.profile.encry_password = undefined
        req.profile.createdAt = undefined
        req.profile.updatedAt = undefined
        return res.json(req.profile)
      
}