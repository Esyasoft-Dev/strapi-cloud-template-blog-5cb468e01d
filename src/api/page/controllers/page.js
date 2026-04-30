'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { transformPage } = require('../../../lib/transformers');

module.exports = createCoreController('api::page.page', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data: Array.isArray(data) ? data.map(transformPage) : transformPage(data), meta };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    return { data: transformPage(data) };
  },
}));
