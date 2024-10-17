import User from "./user.model.js"
import { validateUserProfileData } from "../../utils/validation.js";
import { userTags,filterValidTags } from "../../utils/userTags.validation.js";
import { error } from "console";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const userRegisterationRepo = async (userData) => {
    try {
        const isValidData = validateUserProfileData(userData);
        if(!isValidData){
            return {success:false,error:{statusCode:400,message:"insufficient data"}}
        } 
        const {name,phone,email,password} = userData;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,phone,email,password:hashedPassword,tags:userTags});
        await newUser.save(); 
        return { success: true, data: newUser};
    } catch (error) {
      return { success: false, error: { statusCode: 400, message: error } };
    }
  };


export const userLoginRepo = async (userData) => {
    try {
      console.log(userData)
      const { email, password } = userData;
      if(!email || !password){
        return {
          success: false,
          error: { statusCode: 400, message: "invalid request" },
        };
      }
      const user = await User.findOne({ email });
      if (!user) {
        return {
          success: false,
          error: { statusCode: 404, message: "user not found" },
        };
      }else {
        
        let passwordValidation = await bcrypt.compare(password,user.password);
        if (passwordValidation){
          const token =  jwt.sign({_id:user._id,username:user.name},process.env.JWT_SECRET,
                        {expiresIn: "1h",}
                        );
          return { success: true, data: token ,message:"loged in successfuly!"};
        }else{
          console.log(passwordValidation);
          return {
            success: false,
            error: { statusCode: 400, message: "invalid credentials" },
          };
        }
      }
    }catch (err) {
      return {
        success: false,
        error: { statusCode: 400, message: err },
      };
    }
  };



