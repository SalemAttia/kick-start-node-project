'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const Item = new Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },

    updated_at: {
        type: Date,
    },

    is_active: {
        type: Boolean,
        default: true,
    },
});

Item.plugin(uniqueValidator);
Item.plugin(mongoosePaginate);

module.exports = Item;
