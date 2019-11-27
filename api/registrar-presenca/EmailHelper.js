const axios = require('axios');

module.exports = {
    send: async (email, subject, body, req) => {
        axios.post(`http://${process.env.EMAIL_HOST}/email`, {
            email,
            subject,
            body,
        }, {
            headers: {
                'Authorization': `Bearer ${req.token}`,
            },
        });
    },
};