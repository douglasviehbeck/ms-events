const axios = require('axios');
const DBHelper = require('./DBHelper');
const EmailHelper = require('./EmailHelper');

module.exports = {
    create: async (req, res) => {

        const db = await DBHelper.getConnection();

        let { event_id, user_cpf, user_name, user_email, user_password } = req.body;

        let user = (await axios.post(`http://${process.env.USERS_HOST}/users`, {
            cpf     : user_cpf,
            name    : user_name,
            email   : user_email,
            password: user_password,
        })).data.user;

        let subscription;

        let existingSubscription = (await db.query('SELECT * FROM subscriptions WHERE user_id = $1 AND event_id = $2', [
            user.id,
            event_id,
        ])).rows[0];

        if (existingSubscription) {
            subscription = existingSubscription;
        } else {
            subscription = (await db.query('INSERT INTO subscriptions(user_id, event_id, checked) VALUES($1, $2, false) RETURNING *', [
                user.id,
                event_id,
            ])).rows[0];

            let event = (await db.query('SELECT * FROM events WHERE id = $1', [event_id])).rows[0];

            EmailHelper.send(user.email, `Inscrição em Evento - ${event.name}`, `<p>Você foi inscrito com sucesso no evento <b>${event.name}</b> que acontecerá em <b>${event.location}</b>.</p>`, req);
        }

        res.status(200).send({ subscription });
    },
};