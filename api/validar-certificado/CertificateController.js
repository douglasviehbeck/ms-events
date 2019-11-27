const uuid = require('uuid/v4');
const DBHelper = require('./DBHelper');

module.exports = {
    validate: async (req, res) => {
        const db = await DBHelper.getConnection();
        
        let { uuid } = req.params;

        if (!uuid.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
            return res.status(200).send({ valid: false });
        }

        let certificate = (await db.query('SELECT id FROM certificates WHERE uuid = $1', [uuid])).rows[0];

        res.status(200).send({ valid: !!certificate });
    },
};