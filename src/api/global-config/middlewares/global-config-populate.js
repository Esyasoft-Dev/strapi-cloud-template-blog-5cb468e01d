'use strict';

const populate = {
  footerSocialMediaIcon: true,
  headerMenu: {
    populate: {
      pageLink: true,
      submenuItems: {
        populate: {
          pageLink: true,
          submenuItems: {
            populate: {
              pageLink: true,
            },
          },
        },
      },
    },
  },
  footerMenuColumn1Links: true,
  footerMenuColumn2Links: true,
  footerMenuColumn3Links: true,
  footerMenuColumn4Links: true,
  footerSecondaryMenu: true,
  social_handles: {
    populate: {
      icon: true,
    },
  },
  websiteGroup: {
    populate: {
      image: true,
      logo: true,
    },
  },
};

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.query.useDefaultPopulate !== 'false') {
      ctx.query.populate = populate;
    }
    await next();
  };
};
