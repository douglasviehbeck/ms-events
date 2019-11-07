require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const UserController = require('./UserController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/user', UserController.create);

app.listen(8022, () => console.log("UP"));