const User = require("../models/users")
const{validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")


exports.signUp = (req,res)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()
        });
    }

    const userProfile = new User(req.body)
    console.log("inside lawda")
    userProfile.save((err,success)=>{
        if(err){
            return res.status(400).json({
                err: err,

            })
        }
        res.send({
            name:success.name,
            email:success.email,
            madar:success._id
        })
    })
    // console.log("REQ BODY",req.body)
    // res.json({message:"signup works"})
}

exports.signIn = (req,res) =>{
    const {email,password} = req.body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array() 
        });
    }
    User.findOne({email},(error,succ) => {
        if(error || !succ){
            return res.status(400).json({
                error: "User emailoz does not exist"
            })
        }
        if(!succ.authenticate(password)){
            return res.status(401).json({
                error : "email and password does not match"
            })
        }

        // create token
        const token = jwt.sign({_id:succ._id},process.env.SECRET)
        res.cookie("token",token,{expire: new Date() + 9999})

        // send response to frontend
        const {_id,name,email,role} = succ;
        return res.json({token,loggedInUser:{_id,name,email,role}})
    })

}

exports.signOut = (req,res)=>{
    res.clearCookie("token");
    res.json({message:"User Signed Out"})
}

exports.getAllUsers = (req,res)=>{
    const userList = User.find((err,succ)=>{
        if(err){
            return res.status(400).json({
                err: err,

            })
        }
        res.send(succ)
    })
    // res.json({message:"User Signed Out"})
}

exports.getUser = (req,res)=>{
    const userList = User.findById(req.body._id,(err,scc)=>{
        if(err){
            return res.status(400).json({
                err: err,

            })
        }
        res.send(scc)
    })
}

// protected routes
exports.isSignedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty : "auth"
});

// custom middleware
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth._id
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    if(req.profile.role===0){
        return res.status(403).json({
            error: "You are not admin, ACCESS DENIED"
        })
    }
    next()
}