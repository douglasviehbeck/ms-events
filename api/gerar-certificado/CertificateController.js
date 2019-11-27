const uuid = require('uuid/v4');
const pdf = require('html-pdf');
const DBHelper = require('./DBHelper');
const EmailHelper = require('./EmailHelper');

function formatDate(date) {
    return `${date.getDate().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear().toString().padStart(4, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

module.exports = {
    generate: async (req, res) => {
        const db = await DBHelper.getConnection();
        
        let { event_id } = req.query;

        let subscription = (await db.query('SELECT * FROM subscriptions WHERE user_id = $1 AND event_id = $2 AND checked = true', [req.user.id, event_id])).rows[0];

        if (!subscription) {
            return res.status(404).end();
        }

        let certificate;

        let existingCertificate = (await db.query('SELECT * FROM certificates WHERE subscription_id = $1', [subscription.id])).rows[0];

        if (existingCertificate) {
            certificate = existingCertificate;
        } else {
            certificate = (await db.query('INSERT INTO certificates(subscription_id, uuid, created_at) VALUES($1, $2, $3) RETURNING *', [subscription.id, uuid(), new Date()])).rows[0];
        }

        let event = (await db.query('SELECT * FROM events WHERE id = $1', [event_id])).rows[0];

        pdf.create('' +
            '<html>' +
            '   <body style="display: flex; align-items: center; text-align: center;">' +
            '       <div style="height: 100px; width: 100%; background-color: ' + event.color + '"></div>' +
            '       <br />' +
            '       Certificamos que <b>' + req.user.name + '</b> participou do evento <b>' + event.name + '</b> realizado em <b>' + event.location + '</b> que ocorreu entre ' + formatDate(event.start_date) + ' e ' + formatDate(event.end_date) +
            '       <br />' +
            '       <br />' +
            '       Certificado nº: ' + certificate.uuid +
            '       <br />' +
            '       <div style="height: 100px; width: 100%; background-color: ' + event.color + '"></div>' +
            '   </body>' +
            '</html>' +
            '').toStream(async function(err, stream){
                stream.pipe(res);
            });

        EmailHelper.send(req.user.email, `Certificado Gerado para Evento - ${event.name}`, `<p>O certificado para o evento <b>${event.name}</b> foi gerado com sucesso.</p>`, req);
    },
};