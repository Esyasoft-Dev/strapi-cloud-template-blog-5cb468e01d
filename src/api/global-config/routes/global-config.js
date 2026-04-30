'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::global-config.global-config', {
  config: {
    find: {
      middlewares: ['api::global-config.global-config-populate'],
    },
  },
});
