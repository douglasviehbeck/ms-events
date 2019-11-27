require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const CertificateController = require('./CertificateController');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/certificates/:uuid', CertificateController.validate);

app.listen(8029, () => console.log('UP'));