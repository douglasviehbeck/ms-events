const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res) => {
        let { user, password } = req.body;

        if(user === 'douglas' && password === '123'){
            const id = 1; // ID BANCO

            console.log(process.env);

            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: '7d',
            });

            return res.status(200).send({ auth: true, token: token });
        }
        
        res.status(200).send({ auth: false });
    },
    verify: (req, res) => {
        jwt.verify(req.body.token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            res.status(200).send({ auth: true, user: {a: 1} });
        });
    },
};