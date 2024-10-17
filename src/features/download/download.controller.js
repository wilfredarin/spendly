import pdfkit from "pdfkit";
import { getDates } from "../../utils/getDates.js";
import { getExpenseDetailBeetweenRepo } from "../expense/expense.repository";


export const downloadPdf = async(req,res)=>{
    const dateFormat = getDates(req.params.month);
    const user = req.user;
    if(!dateFormat.isValid){
        return res.send("In valdi data")
    }
    const expenses = await getExpenseDetailBeetweenRepo(dateFormat.data[0],
        dateFormat.data[1],user);
    
    const doc = new pdfkit();
    const fileName = `expenses_${req.params.month}_spendly.pdf`;
    const filePath = `../downloads/${fileName}`;
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);
    doc.fontSize(16).
        text(`Spendly Expenses for ${dateFormat[0]} to ${dateFormat[1]}`,
            {align:"center"}
        );
    expenses.forEach(expense=>{
        doc.moveDown().
        fontSize(12).text(`Date: ${expense.date.toDateString()}`);
        doc.text(`Amount: ${expense.amount}`);
        doc.text(`Comment: ${expense.comment}`);
        doc.text(`Tags: ${expense.tags.join(" ,")}`);
        
    });
    doc.end();
    doc.on('finish',function(){
        res.download(filePath, fileName, function(err) {
            if (err) {
            console.log(err);
            } else {
            fs.unlinkSync(filePath);
            }
        });
    });
}

