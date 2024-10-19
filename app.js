import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import connectToDb from "./src/config/database.js";
import userRouter from "./src/features/user/user.routes.js"
import expenseRouter from "./src/features/expense/expense.routes.js"
import { userAuth } from "./src/middlewares/userAuth.js";
import User from "./src/features/user/user.model.js";
import ejsLayouts from "express-ejs-layouts";
import jwt from "jsonwebtoken"
const app = express();
app.use(cookieParser())
app.use(ejsLayouts)
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(path.resolve(),"src","views"));
app.use(express.static("public"));
 //parse form data  -without we'll not get the form data
app.use(express.urlencoded({extended:true}));



app.use("/user/",userRouter);
app.use("/expense/",userAuth,expenseRouter);

//for first time the user hits
app.get("/",async(req,res)=>{
    //check if loged in
    try{
      const { jwtToken } = req.cookies;
      jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, data) =>{
        if (err) {
          return res.render("index",{userName:null,error:null,successMessage:null});
        } else {
          req._id = data._id;
          req.user = await User.findById(req._id);
          console.log("redirected",req.user.name)
          return res.render("index",{userName:req.user?.name,error:null,successMessage:null});
        }
    }); 
  }catch(err){
    return res.render("index",{userName:req.user?.name,error:err.message,successMessage:null});
  }
  });

app.listen(3000,async(req,res)=>{
    try{
        await connectToDb();
        console.log("serever running on port 3000");
    }catch(err){
        console.log(err.message);
        
    }
});

