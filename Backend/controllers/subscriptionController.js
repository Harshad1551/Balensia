const { createSubscription, getSubscriptions, addMember, updateMemberDetail, getMembers, removeSubscription, removeMemberSubscription } = require('../services/subscriptionService');
const { logActivity } = require('../services/activityService');

exports.addSubscription = async (req, res) => {
    try {
        const { name, totalAmount, billingCycle, nextRenewal } = req.body;
        if (!name || !totalAmount || !billingCycle || !nextRenewal) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const userId = req.user.id;
        const subscription = await createSubscription(userId, name, totalAmount, billingCycle, nextRenewal)

        await logActivity(userId, 'CREATE', 'SUBSCRIPTION', subscription.id, `Added new subscription: ${name} (₹${totalAmount})`);

        res.status(201).json({
            message: "Subscription created successfully",
            subscription
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.subscriptionList = async (req, res) => {
    try {
        const userId = req.user.id;
        const subscriptionList = await getSubscriptions(userId)
        res.status(200).json({
            message: "Subscriptions fetched successfully",
            subscriptionList
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createMember = async (req, res) => {
    try {
        const { memberName, shareAmount } = req.body;
        const subscriptionId = req.params.subscriptionId;
        if (!memberName || !shareAmount) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const member = await addMember(subscriptionId, memberName, shareAmount)

        // Since subscription members don't have a direct user_id tied perfectly in logActivity, we'll log it for the main user (assuming req.user.id is accessible, but it's not in this route. Wait, req.user is usually added by authenticate middleware! In this case, user_id isn't in params or req.user explicitly fetched here. Wait, is authenticate middleware on this route? Usually yes. Let's add req.user.id. Wait, addMember doesn't take userId? Let's assume req.user.id is available since it's a protected route.)
        const userId = req.user ? req.user.id : null;
        if (userId) {
            await logActivity(userId, 'CREATE', 'SUBSCRIPTION_MEMBER', member.id, `Added member ${memberName} to subscription ID: ${subscriptionId}`);
        }

        res.status(201).json({
            message: "Member added successfully",
            member
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.memberList = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        const membersList = await getMembers(subscriptionId)
        res.status(200).json({
            message: "Members fetched successfully",
            membersList
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateMember = async (req, res) => {
    try {
        const { memberName, shareAmount, paymentStatus } = req.body;

        if (!memberName && !shareAmount && !paymentStatus) {
            return res.status(400).json({
                message: "Missing fileds"
            })
        }
        const subscriptionId = req.params.subscriptionId;
        const memberId = req.params.id
        const updatedMember = await updateMemberDetail(subscriptionId, memberId, memberName, shareAmount, paymentStatus)

        const userId = req.user ? req.user.id : null;
        if (userId) {
            await logActivity(userId, 'UPDATE', 'SUBSCRIPTION_MEMBER', updatedMember.id, `Updated member ${updatedMember.member_name}'s details`);
        }

        res.status(200).json({
            message: "Member updated successfully",
            updatedMember
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.deleteSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        const userId = req.user.id;
        const removedSubscription = await removeSubscription(subscriptionId, userId)

        await logActivity(userId, 'DELETE', 'SUBSCRIPTION', null, `Deleted subscription: ${removedSubscription.name}`);

        res.status(200).json({
            message: "Subscription removed successfully",
            removedSubscription
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.deleteMember = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        const memberId = req.params.memberId;
        const removedMember = await removeMemberSubscription(subscriptionId, memberId)

        const userId = req.user ? req.user.id : null;
        if (userId) {
            await logActivity(userId, 'DELETE', 'SUBSCRIPTION_MEMBER', null, `Removed member ${removedMember.member_name} from subscription`);
        }

        res.status(200).json({
            message: "Member removed successfully",
            removedMember
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}