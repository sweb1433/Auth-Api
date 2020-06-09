var express = require("express");
const{check,validationResult} = require("express-validator")


var router = express.Router()
const {signOut,signUp,getAllUsers,getUser,signIn,isSignedIn} = require("../controllers/authController")


router.get("/signout",signOut)
router.get("/testRoute",isSignedIn , (req,res)=>{
  // res.send("A protected Route")
  res.json(req.auth)
})

router.get("/getAllUsers",getAllUsers)
router.get("/getUser",getUser)
router.post("/signup",[
    [
        // username must be an email
        check('email').isEmail(),
        // password must be at least 5 chars long
        check('password').isLength({ min: 5 })
      ]

],signUp);

router.post("/signin",[
    [
        // username must be an email
        check('email').isEmail(),
        // password must be at least 5 chars long
        check('password').isLength({ min: 5 })
      ]

],signIn);

router.get("/signout",signOut)

router.get("/test",isSignedIn , (req,res)=>{
  // res.send("A Protected Route")
  res.json(req.auth)

})




module.exports = router;
