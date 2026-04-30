'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { transformTag } = require('../../../lib/transformers');

module.exports = createCoreController('api::tag.tag', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    return { data: Array.isArray(data) ? data.map(transformTag) : transformTag(data), meta };
  },

  async findOne(ctx) {
    const { data } = await super.findOne(ctx);
    return { data: transformTag(data) };
  },
}));
