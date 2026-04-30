'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { transformProduct } = require('../../../lib/transformers');

module.exports = createCoreController('api::product.product', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data: Array.isArray(data) ? data.map(transformProduct) : transformProduct(data), meta };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    return { data: transformProduct(data) };
  },
}));
