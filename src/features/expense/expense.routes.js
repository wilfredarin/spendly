import express from "express";
import { addExpense ,getFiveMonthsExpense,getMonthExpenseDetail,getMonthExpenseSummary} from "./expense.controller.js";



const router = express.Router();

router.post("/add",addExpense);
router.get("/report",getFiveMonthsExpense)
router.get("/month-summary/:monthYear",getMonthExpenseSummary)
router.get("/month-detail/:monthYear",getMonthExpenseDetail)
export default router;