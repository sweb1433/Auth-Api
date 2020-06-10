const User = require("../models/users")
const Order = require("../models/order")


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

exports.userPurchaseList = (req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name ")
    .exec((err,order) =>{
        if(err){
            return res.status(400).json({
                error: "No order in this account"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderinPurchaseList= (req,res,next) =>{
    let purchases = []
    // data comming from frontend
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantty: product.quatity,
            amount: req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })
    })

    // store in db
    User.findByIdAndUpdate(
        // since user is already logged in and profile object is populated(line 12)
        {_id: req.profile._id},
        // updation purchases in model/databases with the purchases at line 53
        {$push: {purchases:purchases}},
        // new means from the database, send the freshly updated data (only in case of update)
        {new: true},
        (err,purchases) =>{
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchases list in db"
                })
            }
            console.log("purchase list updated in db")
            next()
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
        req.profile.salt = undefined
        req.profile.encry_password = undefined
        req.profile.createdAt = undefined
        req.profile.updatedAt = undefined
        return res.json(req.profile)
      
}