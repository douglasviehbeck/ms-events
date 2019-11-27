require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const EventController = require('./EventController');
const auth = require('./Authentication');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.verify);

app.get('/events', EventController.get);

app.listen(8030, () => console.log('UP'));