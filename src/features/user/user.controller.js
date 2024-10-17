import  {validateUserProfileData}  from "../../utils/validation.js";
import {filterValidTags,userTags} from "../../utils/userTags.validation.js";
import { userRegisterationRepo,userLoginRepo } from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response } from "express";

export const getUserRegistration = (req,res)=>{
    res.render("user-registeration",{userName:req.user?.name,error:null,successMessage:null});
}

export const getUserLogin = (req,res)=>{
    res.render("user-login",{userName:req.user?.name,error:null,successMessage:null});
}

export const getUserUpdate = (req,res)=>{
    res.render("user-login",{userName:req.user?.name,error:null,successMessage:null});
}

export const userRegisteration = async(req,res)=>{
    try{
        const {name,phone,email,password} = req.body;
        console.log(req.body)
        const repoResponse = await userRegisterationRepo({name,email,phone,password})
        if(repoResponse.success){
            res.render("user-login",{userName:req.user?.name,error:null,successMessage:"Welcome to Spendly!"});
        } else {
            res.render("user-registeration",{error:repoResponse.error.message,userName:req.user?.name,successMessage:null});
        }
    }catch(err){
        res.render("user-registeration",{error:err.message,userName:req.user?.name,successMessage:null});
    }    
}

export const userLogin = async (req, res) => {
    const repoResponse = await userLoginRepo(req.body);
    if (repoResponse.success) {
      const token = repoResponse.data;
      res
        .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
        .redirect("/");
    } else {
        res.render("user-login",{error:repoResponse.error.message,userName:req.username,successMessage:null});
    }
  };