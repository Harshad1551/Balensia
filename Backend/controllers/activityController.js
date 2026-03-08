const { getUserTimeline } = require('../services/activityService');

exports.getTimeline = async (req, res) => {
    try {
        const userId = req.user.id;
        const timeline = await getUserTimeline(userId);

        res.status(200).json({
            message: "Timeline fetched successfully",
            timeline
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch timeline" });
    }
};
