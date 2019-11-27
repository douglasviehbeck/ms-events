const DBHelper = require('./DBHelper');
const EmailHelper = require('./EmailHelper');

module.exports = {
    register: async (req, res) => {
        const db = await DBHelper.getConnection();
        
        let { event_id, user_cpf } = req.body;

        let user = (await db.query('SELECT id FROM users WHERE cpf = $1', [user_cpf])).rows[0];

        (await db.query('UPDATE subscriptions SET checked = true WHERE user_id = $1 AND event_id = $2', [user.id, event_id]));

        let event = (await db.query('SELECT * FROM events WHERE id = $1', [event_id])).rows[0];

        EmailHelper.send(req.user.email, `Presença Confirmada em Evento - ${event.name}`, `<p>A sua presença no evento <b>${event.name}</b> foi confirmada com sucesso.</p>`, req);

        res.status(200).end();
    },
};