require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const SubscriptionController = require('./SubscriptionController');
const auth = require('./Authentication');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.verify);

app.put('/subscriptions', SubscriptionController.register);

app.listen(8026, () => console.log('UP'));