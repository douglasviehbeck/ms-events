const bcrypt = require('bcrypt');
const DBHelper = require('./DBHelper');

module.exports = {
    create: async (req, res) => {
        const db = await DBHelper.getConnection();
        
        let { name, email, cpf, password } = req.body;

        bcrypt.hash(password, 5, async (err, hash) => {
            let userId = (await db.query('INSERT INTO users(name, email, cpf, password) VALUES($1, $2, $3, $4) RETURNING id', [
                name,
                email,
                cpf,
                hash,
            ])).rows[0].id;

            let user = (await db.query('SELECT id, name, email, cpf FROM users WHERE id = $1', [userId])).rows[0];

            res.status(200).send({ user });
        });
    },
};