require("dotenv").config()
const mongoose = require('mongoose');
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/usersRoutes")
const categoryRoutes = require("./routes/categoryRoutes")

const cors = require("cors");

const app = express();

// db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch(
    console.log("not connected...")
);
// middlewares
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

//My routes
app.use("/api",authRoutes);
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)

//connection and port
const port =process.env.PORT || 7777;
app.listen(port,()=>{
    console.log(`app is running at ${port}`)
})