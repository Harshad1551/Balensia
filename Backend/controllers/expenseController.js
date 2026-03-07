const {createExpense, getExpenses, updateExpense, deleteExpense} = require('../services/expenseService')

exports.create = async(req, res)=>{
    try{
        const {category, amount, note, date} = req.body;
        const userId = req.user.id;
        
        if(!category || !amount || !date){
            return res.status(400).json({
                message:"Fill the required details"
            })
        }
        const expense = await createExpense(userId, category, amount, note, date);
    
        res.status(201).json({
            message:"Expense added",
            expense
        })
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}


exports.get = async(req,res)=>{

    try{
    const userId = req.user.id;

    const Expenses = await getExpenses(userId);

    res.status(200).json({
        message:"List of expenses",
        Expenses
    })
}catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

exports.update = async(req, res)=>{
    try{
        const {category, amount, note, date} = req.body;
        
        const expenseId = req.params.id;
        const userId = req.user.id;

        const UpdatedExpense = await updateExpense(expenseId, category, amount, note, date, userId);

        res.status(200).json({
            message:"Expense is updated",
            UpdatedExpense
        })
        

    }catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}


exports.Delete = async(req,res)=>{
    try{
        const expenseId = req.params.id;
        const userId = req.user.id;

        const DeleteExpense = await deleteExpense(expenseId, userId)

        res.status(200).json({
            message:"Expense is removed",
            DeleteExpense
        })
    }catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}