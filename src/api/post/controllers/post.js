'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { transformPost } = require('../../../lib/transformers');

module.exports = createCoreController('api::post.post', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data: Array.isArray(data) ? data.map(transformPost) : transformPost(data), meta };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    return { data: transformPost(data) };
  },
}));
