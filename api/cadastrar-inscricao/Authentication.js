const axios = require('axios');

function unvalidate(res) {
    res.status(401).end();
}

module.exports = {
    verify: async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization) {
            return unvalidate(res);
        }

        const token = authorization.split('Bearer ')[1];

        if (!token) {
            return unvalidate(res);
        }

        let response = await axios.post(`http://${process.env.AUTHENTICATION_HOST}/verify`, { token });

        if (!response.data.auth) {
            return unvalidate(res);
        }

        req.user = response.data.user;
        req.token = token;

        next();
    },
};