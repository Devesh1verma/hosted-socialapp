const express=require("express");
const app =express();
const cors=require("cors")
const path=require("path")
// const dotenv=require("dotenv");
const mongoose=require('mongoose');
// const {mongoUrl}=require("./keys");
require('dotenv').config();
require("./models/model");
require("./models/post");


app.use(cors());
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
const port=process.env.port || 5000;

const mongoUrl=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.flgu4xq.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoUrl);
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected");
})
mongoose.connection.on("error",()=>{
    console.log("Error in Connection");
})
app.use(express.static(path.join(__dirname,"./Frontend/build")))
app.get("*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"./Frontend/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})