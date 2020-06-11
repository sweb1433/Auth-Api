const express = require("express")
const router = express.Router()

const {getProductById,createProduct} = require("../controllers/productController")
const {isSignedIn, isAuthenticated,isAdmin} = require("../controllers/authController")
const {getUserById} = require("../controllers/userController")

// all of params
router.param("userId", getUserById)
router.param("productId", getProductById)

// all of actual routes
router.post("/product/create/:userId",isSignedIn, isAuthenticated,isAdmin,createProduct)


module.exports = router