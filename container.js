'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./connection');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const itemRoutes = require('./src/Routes/items')(app);

const dbConnection = async() => {
    const mongoose = await connection();
    return mongoose.connection.db;
};

module.exports =  {
    'database.connection': dbConnection(),
    'item.routes': itemRoutes,
    'express.app': app,
};

