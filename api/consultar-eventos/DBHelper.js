module.exports = {
    getConnection: async () => {
        const { Client } = require('pg');
        const client = new Client({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 5432,
        });

        await client.connect();

        return client;
    },
};