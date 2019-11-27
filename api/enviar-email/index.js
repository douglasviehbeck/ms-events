require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const app = express();
const EmailController = require('./EmailController');
const auth = require('./Authentication');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.verify);

app.post('/email', EmailController.send);

app.listen(8031, () => console.log('UP'));