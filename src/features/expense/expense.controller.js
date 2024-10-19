import {isValidExpenseData} from "../../utils/validation.js"
import {userTags,filterValidTags} from "../../utils/userTags.validation.js"
import {getStrMonthYear,getLastFiveMonthsArr} from "../../utils/getDates.js";
import { addExpenseRepo,getDetailByTagsRepo,getTotalExpenseByMonth,getExpenseDetailRepo} from "./expense.repository.js";
export const addExpense = async(req,res)=>{
    try{
        const user  = req.user;
        if(!isValidExpenseData(req)){
            throw new Error("Invaid Expense Data");
        }
        const {amount,comment,date,tags} = req.body;
        const tagsArr = tags.split(",");
        let monthYear = getStrMonthYear(date);
        const userId = user._id; 
        const allowedTags = userTags;
        let takenTags = filterValidTags(req.user,tagsArr);
        const repoResponse = await addExpenseRepo({amount,comment,date,tags:takenTags,userId,monthYear})
        if(repoResponse.success){
            res.render("index",{userName:req.user?.name,error:null,successMessage:"Expense Added!"});
        } else {
            res.render("index",{error:repoResponse.error.message,userName:req.user?.name,successMessage:null});
        }
    }catch(err){
        res.render("index",{error:err.message,userName:req.user?.name,successMessage:null});
    }    
}

export const getMonthExpenseDetail = async(req,res)=>{
    try{
        const user = req.user;
        const monthYear = req.params.monthYear;
        console.log(monthYear,"year")
        const repoResponse = await getExpenseDetailRepo(monthYear,user);
        if(repoResponse.success){
            res.render("month-detail",{data:repoResponse.data,
                userName:req.user?.name,error:null,successMessage:`Monthly Expense Detail for ${monthYear} Fetched!`});
        } else {
            res.render("month-wise-expense",{data:null,error:repoResponse.error.message,userName:req.user?.name,successMessage:null});
        }
    }catch(err){
        res.render("month-wise-expense",{data:null,error:err.message,userName:req.user?.name,successMessage:null});
    }
}
export const getMonthExpenseSummary = async(req,res)=>{
    try{
        const user = req.user;
        const monthYear = req.params.monthYear;
        console.log(monthYear,"year")
        const repoResponseTags = await getDetailByTagsRepo(monthYear,user);
        if(repoResponseTags.success){
            res.render("month-summary",{tagData:repoResponseTags.data,monthYear:monthYear,
                userName:req.user?.name,error:null,successMessage:`Monthly Expense Detail for ${monthYear} Fetched!`});
        } else {
            res.render("month-wise-expense",{data:null,error:repoResponseTags.error.message,userName:req.user?.name,successMessage:null});
        }
    }catch(err){
        res.render("month-wise-expense",{data:null,error:err.message,userName:req.user?.name,successMessage:null});
    }    
}

export const getFiveMonthsExpense = async(req,res)=>{
    try{
        const page = req.query.page||1;
        const user = req.user;
  
        const lastFiveMonths = getLastFiveMonthsArr(page);
        const monthArray = lastFiveMonths.monthArray
  
        const startDate = lastFiveMonths.startDate;
        const endDate = lastFiveMonths.endDate;  
        let repoResponse = await getTotalExpenseByMonth(startDate,endDate,user);
        if(repoResponse.success){
            console.log(repoResponse.data)
            res.render("month-wise-expense",{data:repoResponse.data,userName:null,error:null,successMessage:null})
        }
    }catch(err){
        res.render("month-wise-expense",{months:null,userName:null,error:err.message,successMessage:null})
    }
}