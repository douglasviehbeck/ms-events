const DBHelper = require('./DBHelper');
const EmailHelper = require('./EmailHelper');

module.exports = {
    delete: async (req, res) => {
        const db = await DBHelper.getConnection();

        let { event_id } = req.body;

        let subscription = (await db.query('DELETE FROM subscriptions WHERE user_id = $1 AND event_id = $2 AND checked = false RETURNING *', [req.user.id, event_id])).rows[0];

        let event = (await db.query('SELECT * FROM events WHERE id = $1', [event_id])).rows[0];

        if (subscription) {
            EmailHelper.send(req.user.email, `Cancelamento de Inscrição em Evento - ${event.name}`, `<p>A sua inscrição no evento <b>${event.name}</b> foi cancelada com sucesso.</p>`, req);
        }

        res.status(200).send({ subscription });
    },
};