const nodemailer = require('nodemailer');

module.exports = {
    send: async (req, res) => {
        let { subject, body, email } = req.body;

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'suportepostsapp@gmail.com',
                pass: 'mmdv1234'
            }
        });

        var mailOptions = {
            to: email,
            subject: subject,
            html: body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            res.status(200).send({ success: !error });
        });
    },
};