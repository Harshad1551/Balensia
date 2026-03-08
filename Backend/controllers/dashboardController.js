const {
   getDashboardSummary 
} = require('../services/dashboardService')

exports.dashboardSummary = async(req, res)=>{
    const userId = req.user.id;

    const summaryList = await getDashboardSummary(userId)

    return res.status(200).json({
        message:"Here is the realBalance",
        summaryList
    })
}