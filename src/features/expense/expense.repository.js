import Expense from "../../features/expense/expense.model.js";
import User from "../../features/user/user.model.js";
import express from "express";
import {userTags,filterValidTags} from "../../utils/userTags.validation.js"


export const addExpenseRepo = async (data)=>{
    try{
        const newExpense = new Expense(data);
        await newExpense.save();
        return { success: true, data: newExpense ,message:"data added successfuly"};
    }catch(err){
        return {
            success: false,
            error: { statusCode: 400, message: err },
          };
    }
}

export const getExpenseDetailRepo = async(monthYear,user)=>{
    try{
        const expense = await Expense.find({userId:user._id,
                                monthYear}
                            );
        if(expense.length==0){
            return {
                success: false,
                error: { statusCode: 400, message: "No Expense recorded yet!" },
              };
        }
        return { success: true, data: expense ,message:"data fetched successfuly"};
        }catch(err){
            return {
                success: false,
                error: { statusCode: 400, message: err },
              };
        }
}

export const getTotalExpenseByMonth = async(startDate,endDate,user)=>{
    try{
        console.log(startDate,endDate)
        const expense = await Expense.aggregate(
            [
                {
                $match:
                    {date:{$gte:startDate,$lt:endDate},userId:user._id}
                },
                {
                    $group: {
                      _id: "$monthYear",            
                      totalAmount: { $sum: "$amount" }  
                    }
                  }

            ]
        );

        if(expense.length==0){
            return {
                success: false,
                error: { statusCode: 400, message: "No Expense recorded yet!" },
            };
        }
        return { success: true, data: expense ,message:"data fetched successfuly"}

    }catch(err){
        return {
            success: false,
            error: { statusCode: 400, message: err },
          };
    }
}

export const getDetailByTagsRepo = async (monthYear,user)=>{
    try{
        const expense = await Expense.aggregate(
            [
                {
                    $match:{
                        monthYear,
                        userId:user._id
                    }
                },
                {$unwind:{path:"$tags",preserveNullAndEmptyArrays: true}},
                
                {
                    $group:{
                    _id:"$tags",
                    totalExpenditure:{$sum:"$amount"}
                    }
                }
            ]
        );
        const totalExpenditure = await Expense.aggregate([
            {
                $match:{
                    monthYear,
                    userId:user._id
                }
            },
            {$group:{
                _id:null,
                totalExpenditure:{$sum:"$amount"}
            
            }}
        ])
        if(expense.length==0){
            return { success: false,
                 error: {statusCode:404,message:new Error("No entry available for this period")} 
            }
        }else{
             return { success: true, data: {expense,totalExpenditure} ,message:"data fetched successfuly"}
        }
    }catch(err){
        return {
            success: false,
            error: { statusCode: 400, message: err },
          };
    }
}
// router.get("/summary",userAuth,async(req,res)=>{
//     try{ 
//         const user = req.user;
//         const strFormat = req.query.month;
//         const dateFormat  = getDates(strFormat);
        
       
        
//         return res.json({byTags:expense,totalExpenditure})
//     }catch(err){
//         res.status(400).json({message:"Something went wrong",data:err.message});
//     }
// });

// export const updateExpenseByIdRepo = async(expenseId,userId,expenseData)=>{
//     try{
//         const user = req.user;
//         const expenseId = req.params.expenseId;
//         const expense = await Expense.findOne({_id:expenseId,userId});
//         if(!expense){
//             return res.status(404).json({message:"Expense not found!"})
//         }
//         const {amount,tags,comment,date} = expenseData;
//         if(amount){
//             expense.amount = amount;
//         }
//         if(tags){
//             expense.tags = filterTags(req.user,tags);
//         }
//         if(date){
//             expense.date = date;
//         }
//         if(comment){
//             expense.comment = comment;
//         }
//         const data = await expense.save();
//         return { success: true, data: expense ,message:"data fetched successfuly"};
//     }catch(err){
//         res.status(400).json({message:"failed to update expsense",error:err.message});
//     }
// }

