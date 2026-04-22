'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreRouter('api::page.page', {
  config: {
    find: {
      middlewares: ['api::page.page-populate'],
    },
    findOne: {
      middlewares: ['api::page.page-populate'],
    },
  },
});
