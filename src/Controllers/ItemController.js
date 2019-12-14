'use strict';

const{ ItemService, BaseController } = require('../Services');

class ItemController extends BaseController {

    constructor() {
        super();
        this.service = new ItemService();
    }

    async getAll() {
        const promise = await this.ItemRepository.findAll();
        const response = await this.respond(promise, 200);
        return response;
    }

    async create(data) {
        const promise = await this.service.create(data);
        const response = await this.respond(promise, 201);
        return response;
    }

    async show(id) {
        const promise = await this.ItemRepository.show(id);
        const response = await this.respond(promise, 200);
        return response;
    }

    async update(data) {
        const promise = await this.ItemRepository.update(data);
        const response = await this.respond(promise, 201);
        return response;
    }

    async remove(data) {
        const promise = await this.ItemRepository.remove(data);
        const response = await this.respond(promise, 200);
        return response;
    }

}

module.exports = ItemController;
