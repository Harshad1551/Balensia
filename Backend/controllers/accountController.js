const {createAccount,getAccounts, updateAccountBalance} = require('../services/accountService')

exports.createAccount = async(req, res)=>{

    try{
    const {bank_name, balance, account_type} = req.body;

    if(!bank_name || !balance || !account_type){
        return res.status(400).json({
            message:"All fileds are required"
        })
    }

    const userId = req.user.id;

    const account = await createAccount(userId, bank_name, balance, account_type);

    res.status(201).json({
        message:"Account added",
        account
    })
}
catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
}

exports.getAccounts = async(req, res)=>{
    
    try{
    const userId = req.user.id;

    const accountsList = await getAccounts(userId);

    res.status(200).json({
        success: true,
        message:"List of accounts",
        accountsList
    })
} catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

exports.updateAccountBalance = async(req, res)=>{
    
    try{
    const accountId = req.params.id;
    const {balance} = req.body;
    const userId = req.user.id;
    if(!balance){
        return res.status(400).json({
            message:"Balance is required"
        })
    }
    const updatedAccount = await updateAccountBalance(accountId, balance, userId);
    res.status(200).json({
        success: true,
        message:"Account balance updated",
        updatedAccount
    })
} catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}