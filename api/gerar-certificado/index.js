require('dotenv').config({path:__dirname + '/.env'});

const express = require('express');
const cors = require('cors');
const app = express();
const CertificateController = require('./CertificateController');
const auth = require('./Authentication');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(auth.verify);

app.get('/certificates', CertificateController.generate);

app.listen(8028, () => console.log('UP'));