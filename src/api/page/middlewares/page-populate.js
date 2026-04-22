'use strict';

const populate = {
  seoImage: true,
  blocks: {
    on: {
      'sections.hero': { populate: { background: true, video: true } },
      'sections.numbers-tiles': {
        populate: {
          tilesSectionBackground: true,
          tile1Image: true, tile2Image: true, tile3Image: true,
          tile4Image: true, tile5Image: true, tile6Image: true,
        },
      },
      'sections.cta-banner': { populate: { logo: true, pdfDocument: true } },
      'sections.cta-section': { populate: { background: true } },
      'sections.animated-logos': { populate: { logosRow1: true, logosRow2: true } },
      'sections.gallery': { populate: { gallery: true } },
      'sections.media-tabs': { populate: { background: true } },
      'sections.cards': {
        populate: {
          cardItems: { populate: { image: true, logo: true } },
          groupCardItems: {
            populate: {
              items: { populate: { image: true, logo: true } },
            },
          },
        },
      },
      'sections.title-text-cta': true,
      'sections.title-richtext': true,
      'sections.title-repeater': true,
      'sections.form-section': true,
      'sections.tabbed-content': true,
      'elements.tab': true,
    },
  },
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query.populate = populate;
    await next();
  };
};
