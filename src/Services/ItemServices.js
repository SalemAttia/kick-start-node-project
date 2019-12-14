'use strict';

const{ ItemRepository } = require('../Repositories');

class ItemService {

    constructor() {
        this.ItemRepository = new ItemRepository();
    }

    async getAll() {
        const list = await this.ItemRepository.findAll();
        return list;
    }

    async create(data) {
        const promise = await this.ItemRepository.create(data);
        return promise;
    }

    async show(id) {
        const promise = await this.ItemRepository.findById(id);
        return promise;
    }

    async update(data) {
        const promise = await this.ItemRepository.update(data);
        return promise;
    }

    async remove(data) {
        const promise = await this.ItemRepository.remove(data);
        return promise;
    }

}

module.exports = ItemService;
