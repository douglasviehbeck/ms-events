require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const LoginController = require('./LoginController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/authenticate', LoginController.authenticate);
app.post('/verify', LoginController.verify);

app.listen(8021, () => console.log('UP'));