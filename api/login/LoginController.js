const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DBHelper = require('./DBHelper');

module.exports = {
    authenticate: async (req, res) => {
        const db = await DBHelper.getConnection();
        
        let { email, password } = req.body;

        let user = (await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];

        if (!user) {
            return res.status(200).send({ auth: false });
        }

        const id = user.id;

        bcrypt.compare(password, user.password, async (err, valid) => {
            if (valid) {
                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: '7d',
                });
                
                res.status(200).send({ auth: true, token: token });
            } else {
                res.status(200).send({ auth: false });
            }
        });
    },
    verify: (req, res) => {
        jwt.verify(req.body.token, process.env.SECRET, async (err, decoded) => {
            if (err) return res.status(200).send({ auth: false, message: 'Failed to authenticate token.' });
            const db = await DBHelper.getConnection();
            
            let user = (await db.query('SELECT id, name, email, cpf FROM users WHERE id = $1', [decoded.id])).rows[0];

            res.status(200).send({ auth: true, user });
        });
    },
};