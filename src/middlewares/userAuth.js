import jwt from "jsonwebtoken"
import User from "../features/user/user.model.js";
export const userAuth = async (req,res,next)=>{
    try{
        const {jwtToken} = req.cookies;
        if(!jwtToken){
            return res.render("index",{userName:null,error:"Not Authorized!",successMessage:null})
        }
        const decodedObj = jwt.verify(jwtToken,process.env.JWT_SECRET);
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            return res.render("index",{userName:null,error:"Not Authorized!",successMessage:null})
        }
        req.user = user;
        next();
    }catch(err){
        console.log(err)
        res.redirect("/",{userName:null,error:err.message,successMessage:null})
    }
}