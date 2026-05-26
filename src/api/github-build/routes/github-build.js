'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/github-build',
      handler: 'api::github-build.github-build.trigger',
      config: {
        auth: false,
      },
    },
  ],
};
