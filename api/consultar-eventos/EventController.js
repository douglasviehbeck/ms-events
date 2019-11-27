const DBHelper = require('./DBHelper');

module.exports = {
    get: async (req, res) => {
        const db = await DBHelper.getConnection();

        let events = (await db.query('SELECT even.*, subs.checked is not null AND subs.checked FROM events even LEFT JOIN subscriptions subs ON even.id = subs.event_id AND subs.user_id = $1', [req.user.id])).rows;

        res.status(200).send({ events });
    },
};