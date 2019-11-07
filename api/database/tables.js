require('dotenv').config();

const { Client } = require('pg');
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432,
});

(async () => {
    await db.connect();

    await db.query(`
        CREATE TABLE users (
            id SERIAL NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            cpf VARCHAR(11) NOT NULL,
            password VARCHAR(255) NULL,
            PRIMARY KEY (id)
        );
    `);
        
    await db.query(`
        CREATE TABLE events (
            id SERIAL NOT NULL,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            PRIMARY KEY (id)
        );
    `);
        
    await db.query(`
        CREATE TABLE subscriptions (
            id SERIAL NOT NULL,
            user_id INT NOT NULL,
            event_id INT NOT NULL,
            checked BOOLEAN NOT NULL,
            PRIMARY KEY (id),
            CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id),
            CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES events (id)
        );
    `);
        
    await db.query(`
        CREATE TABLE certificates (
            id SERIAL NOT NULL,
            subscription_id INT NOT NULL,
            created_at TIMESTAMP NOT NULL,
            PRIMARY KEY (id),
            CONSTRAINT fk_subscription_id FOREIGN KEY (subscription_id) REFERENCES subscriptions (id)
        );
    `);
})();
