import express from "express";
import { addExpense ,getFiveMonthsExpense,getMonthExpense} from "./expense.controller.js";



const router = express.Router();

router.post("/add",addExpense);
router.get("/report",getFiveMonthsExpense)
router.get("/month-detail/:monthYear",getMonthExpense)
export default router;