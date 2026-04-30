'use strict';

const populate = {
  mainImage: true,
  keyFeaturesImage: true,
  video: true,
  images: true,
  diagram: true,
  dataSheetDocument: true,
  userManualDocument: true,
  productTags: true,
};

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.query.useDefaultPopulate !== 'false') {
      ctx.query.populate = populate;
    }
    await next();
  };
};
