'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const { transformGlobalConfig } = require('../../../lib/transformers');

module.exports = createCoreController('api::global-config.global-config', () => ({
  async find(ctx) {
    const response = await super.find(ctx);
    // Single type: response.data is a plain object, not an array
    return { data: transformGlobalConfig(response.data) };
  },
}));
