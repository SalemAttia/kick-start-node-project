'use strict';

const{ ItemService, BaseController } = require('../Services');

class ItemController extends BaseController {

    constructor() {
        super();
        this.service = new ItemService();
    }

}

module.exports = ItemController;
