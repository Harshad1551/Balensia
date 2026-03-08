const { createRefund, getRefunds, markRefundReceived, deleteRefund } = require('../services/refundService');
const { logActivity } = require('../services/activityService');

exports.addRefund = async (req, res) => {
    try {
        const { person, amount, note } = req.body;

        if (!amount || !person) {
            return res.status(400).json({
                message: "amount and name of person required"
            })
        }

        const userId = req.user.id;

        const refund = await createRefund(userId, person, amount, note);

        await logActivity(userId, 'CREATE', 'REFUND', refund.id, `Added pending refund of ₹${amount} from ${person}`);

        return res.status(201).json({
            message: "Refund is added",
            refund
        })
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}
exports.refundsList = async (req, res) => {
    try {
        const userId = req.user.id;
        const refundList = await getRefunds(userId)

        return res.status(200).json({
            message: "List",
            refundList
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}
exports.refundReceived = async (req, res) => {
    try {
        const refundId = req.params.id;
        const userId = req.user.id;

        const refundReceived = await markRefundReceived(refundId, userId);

        await logActivity(userId, 'UPDATE', 'REFUND', refundReceived.id, `Marked refund from ${refundReceived.person} as received`);

        return res.status(200).json({
            message: "Status changed",
            refundReceived
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}
exports.refundDelete = async (req, res) => {
    try {
        const refundId = req.params.id;
        const userId = req.user.id;

        const refundRemoved = await deleteRefund(refundId, userId);

        await logActivity(userId, 'DELETE', 'REFUND', null, `Deleted refund record for ${refundRemoved.person}`);

        return res.status(200).json({
            message: "deleted",
            refundRemoved
        })
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

}