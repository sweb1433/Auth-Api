 const express = require("express")
 const router = express.Router()

 const {getCategoryById, createCategory ,getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/categoryController")
 const { isSignedIn,isAuthenticated,isAdmin } = require("../controllers/authController")
 const { getUserById} = require("../controllers/userController")

//  params
 router.param("userId",getUserById)
 router.param("categoryId", getCategoryById)

//  actual routers goes here

router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin, createCategory)
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)

// update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin, updateCategory)

router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin, removeCategory)

 module.exports = router