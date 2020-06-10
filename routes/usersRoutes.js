// var User =require("../models/users")

const express = require("express")
const router = express.Router()

const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/userController");
const {isAdmin,isSignedIn,isAuthenticated} = require("../controllers/authController");

router.param("userId",getUserById)

router.get("/user/:userId" ,isSignedIn,isAuthenticated, getUser)
router.put("/user/:userId" ,isSignedIn,isAuthenticated, updateUser)
router.get("/orders/user/:userId" ,isSignedIn,isAuthenticated, userPurchaseList)


// get all users
// router.get("/getAllUsers" , getUsers)




module.exports = router

