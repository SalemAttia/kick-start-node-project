'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./connection');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConnection = async() => {
    const mongoose = await connection();
    return mongoose.connection.db;
};

module.exports =  {
    'database.connection': dbConnection(),
    'express.app': app,
};

