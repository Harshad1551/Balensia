const {createSubscription, getSubscriptions, addMember, updateMemberDetail,getMembers, removeSubscription, removeMemberSubscription} = require('../services/subscriptionService')

exports.addSubscription = async(req, res)=>{
    try{
        const { name, totalAmount, billingCycle, nextRenewal} = req.body;
        if(!name || !totalAmount || !billingCycle || !nextRenewal){
            return res.status(400).json({message: "All fields are required"})
        }

        const userId = req.user.id;
        const subscription = await createSubscription(userId, name, totalAmount, billingCycle, nextRenewal)
        
res.status(201).json({
    message: "Subscription created successfully",
    subscription
})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.subscriptionList = async(req, res)=>{
    try{
        const userId = req.user.id;
        const subscriptionList = await getSubscriptions(userId)
        res.status(200).json({
            message: "Subscriptions fetched successfully",
            subscriptionList
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.createMember = async(req, res)=>{
    try{
        const {memberName, shareAmount} = req.body;
        const subscriptionId = req.params.subscriptionId;
        if(!memberName || !shareAmount){
            return res.status(400).json({message: "All fields are required"})
        }
        const member = await addMember(subscriptionId, memberName, shareAmount)
        res.status(201).json({
            message: "Member added successfully",
            member
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.memberList = async(req, res)=>{
    try{
        const subscriptionId = req.params.subscriptionId;
        const membersList = await getMembers(subscriptionId)
        res.status(200).json({
            message: "Members fetched successfully",
            membersList
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.updateMember = async(req, res)=>{
    try{
        const{memberName, shareAmount, paymentStatus} = req.body;

        if(!memberName && !shareAmount && !paymentStatus){
            return res.status(400).json({
                message:"Missing fileds"
            })
        }
        const subscriptionId = req.params.subscriptionId;
        const memberId = req.params.id
        const updatedMember = await updateMemberDetail(subscriptionId, memberId, memberName, shareAmount, paymentStatus)
        res.status(200).json({
            message: "Member updated successfully",
            updatedMember
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.deleteSubscription = async(req, res)=>{
    try{
        const subscriptionId = req.params.subscriptionId;
        const userId =req.user.id;
        const removedSubscription = await removeSubscription(subscriptionId, userId)
        res.status(200).json({
            message: "Subscription removed successfully",
            removedSubscription
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
exports.deleteMember = async(req, res)=>{
    try{
        const subscriptionId = req.params.subscriptionId;
        const memberId = req.params.memberId;
        const removedMember = await removeMemberSubscription(subscriptionId, memberId)
        res.status(200).json({
            message: "Member removed successfully",
            removedMember
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}