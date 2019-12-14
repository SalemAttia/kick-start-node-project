'use strict';

const _ = require('lodash');
const{ ItemController } = require('../Controllers');

module.exports = app => {
    const itemController = new ItemController();

    app.post('/blogs.create', async(req, res) => {
        const response = await itemController.create(req.body);
        res.send(response);
    });

    app.get('/blogs.info', async(req, res) => {
        const response = await itemController.show(req.query._id);
        res.send(response);
    });

    app.post('/blogs.update', async(req, res) => {
        const response = await itemController.update(req.body);
        res.send(response);
    });

    app.post('/blogs.remove', async(req, res) => {
        const response = await itemController.remove(req.body);
        res.send(response);
    });
};
