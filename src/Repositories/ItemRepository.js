'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const{ Item } = require('../Models');

class ItemsIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'IllegalArgument';
    }

}

class ItemNotFoundError extends Error {

    constructor(message) {
        super(message);
        this.name = 'NotFound';
    }

}

class ItemRepository {

    constructor() {
        this.model = mongoose.model('Item', Item);
    }

    create(item) {
        if(!_.isPlainObject(item)) {
            throw new ItemsIllegalArgumentError('missing Item object');
        }

        return this.model.create(Item);
    }

    findAll(options = {}) {
        return this.model.paginate({ is_active: true }, options);
    }

    search(query, options = {}) {
        query.is_active = true;
        return this.model.paginate(query, options);
    }

    findById(itemId) {
        if(_.isNil(itemId)) {
            throw new ItemsIllegalArgumentError('missing id');
        }

        return this._find(itemId);
    }

    update(item) {
        if(!_.isObject(item) || _.isNil(item._id)) {
            throw new ItemsIllegalArgumentError('missing item or item id');
        }

        return this._update(item);
    }

    remove(item) {
        if(!_.isObject(item) || _.isNil(item._id)) {
            throw new ItemsIllegalArgumentError('missing item or item id');
        }

        item.is_active = false;
        return this._update(item);
    }

    restore(item) {
        if(!_.isObject(item) || _.isNil(item._id)) {
            throw new ItemsIllegalArgumentError('missing item or item id');
        }

        item.is_active = true;
        return this._update(item);
    }

    async _find(itemId) {
        const item = await this.model.findById(itemId);
        
        if(_.isNil(item)) {
            throw new ItemNotFoundError('not found');
        }

        return item;
    }

    async _update(updatedItem) { 
        updatedItem.updated_at = new Date();
        const originalBlog = await this._find(updatedItem._id);

        return this.model.findByIdAndUpdate(
            originalBlog._id,
            updatedItem,
            { new: true, runValidators: true, context: 'query' },
        );
    }

}

module.exports = ItemRepository;
module.exports.Errors = {
    ItemsIllegalArgumentError,
    ItemNotFoundError,
};
