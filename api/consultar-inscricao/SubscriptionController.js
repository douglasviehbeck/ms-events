const DBHelper = require('./DBHelper');

module.exports = {
    get: async (req, res) => {
        const db = await DBHelper.getConnection();
        
        let { event_id } = req.query;

        let subscriptions;

        if (event_id) {
            subscriptions = (await db.query('SELECT subs.id, subs.checked, subs.event_id, even.name event_name, even.location event_location FROM subscriptions subs INNER JOIN events even ON subs.event_id = even.id WHERE even.id = $1 AND subs.user_id = $2', [event_id, req.user.id])).rows;
        } else {
            subscriptions = (await db.query('SELECT subs.id, subs.checked, subs.event_id, even.name event_name, even.location event_location FROM subscriptions subs INNER JOIN events even ON subs.event_id = even.id WHERE subs.user_id = $1', [req.user.id])).rows;
        }

        res.status(200).send({ subscriptions });
    },
};