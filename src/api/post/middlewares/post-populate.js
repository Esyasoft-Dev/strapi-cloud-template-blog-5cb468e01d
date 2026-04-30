'use strict';

const populate = {
  mainImage: true,
  category: true,
  postTags: true,
};

module.exports = () => {
  return async (ctx, next) => {
    ctx.query.populate = populate;
    await next();
  };
};
