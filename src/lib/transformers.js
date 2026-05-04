'use strict';

const BASE_URL = process.env.PUBLIC_URL || 'http://localhost:1337';

// Single place to add/rename block types — Strapi component key → Contentful ctId
const COMPONENT_MAP = {
  'sections.hero': 'hero',
  'sections.numbers-tiles': 'numberstiles',
  'sections.cta-banner': 'ctaBanner',
  'sections.title-text-cta': 'titleTextCta',
  'sections.animated-logos': 'animatedLogos',
  'elements.tab': 'tabs',
  'sections.gallery': 'gallery',
  'sections.cta-section': 'ctaSection',
  'sections.cards': 'cards',
  'sections.title-richtext': 'titlerichText',
  'sections.form-section': 'formSection',
  'sections.media-tabs': 'mediatabs',
  'sections.tabbed-content': 'tabbedContent',
};

// ---------- Media ----------

function transformMedia(m) {
  if (!m) return null;
  const raw = m.url || '';
  const url = raw.startsWith('http') ? raw : `${BASE_URL}${raw}`;
  return {
    fields: {
      file: {
        url,
        contentType: m.mime || '',
        details: { image: { width: m.width || 0, height: m.height || 0 } },
      },
      title: m.alternativeText || m.name || '',
    },
  };
}

// ---------- Reference ----------

function transformReference(entry, contentType) {
  if (!entry) return undefined;
  return {
    sys: { contentType: { sys: { id: contentType } } },
    fields: {
      slug: entry.slug,
      name: entry.name || entry.title,
      postType: entry.postType,
      ctaLink: entry.ctaLink || entry.url,
    },
  };
}

// Handles ctaLink stored in block fields: null | plain string | { ctfId } | resolved link object
function transformCtaLink(raw) {
  if (!raw) return null;
  if (raw.ctfId) return null;

  if (raw.type === 'url' || raw.ctaLink || typeof raw === 'string') {
    return {
      sys: { contentType: { sys: { id: 'url' } } },
      fields: { ctaLink: typeof raw === 'string' ? raw : (raw.ctaLink || raw.url || '/') },
    };
  }
  if (raw.type === 'page' && raw.slug) return transformReference(raw, 'page');
  if (raw.type === 'product' && raw.slug) return transformReference(raw, 'product');
  if (raw.type === 'post' && raw.slug) return transformReference(raw, 'post');
  if (raw.slug) return transformReference(raw, raw.postType ? 'post' : 'page');
  return null;
}

// ---------- Tag ----------

function transformTag(tag) {
  return {
    fields: { name: tag?.name, value: tag?.value, type: tag?.tag_type },
    sys: { id: String(tag?.id || tag?.documentId || '') },
  };
}

// ---------- Card ----------

function transformCard(card) {
  let ctaLink = null;
  // if (card.ctaLinkData) {
  //   ctaLink = transformCtaLink(card.ctaLinkData);
  // } else if (card.ctaLink) {
  //   ctaLink = { sys: { contentType: { sys: { id: 'url' } } }, fields: { ctaLink: card.ctaLink } };
  // }

  if (card.ctaLink) {
    ctaLink = { sys: { contentType: { sys: { id: 'url' } } }, fields: { ctaLink: card.ctaLink } };
  }

  return {
    fields: {
      title: card.title,
      text: card.text,
      ctaLabel: card.ctaLabel,
      ctaWillOpenModal: card.ctaWillOpenModal ?? false,
      showAddressFields: card.showAddressFields ?? false,
      address1: card.address1,
      address2: card.address2,
      bio: card.bio,
      opacity: card.opacity,
      shortDescription: card.shortDescription,
      ctaLink,
      image: transformMedia(card.image),
      logo: transformMedia(card.logo),
    },
    sys: { id: card.documentId || String(card.id) },
  };
}

function transformCards(cards) {
  if (!Array.isArray(cards)) return [];
  return cards.map((card, i) => {
    let ctaLink = null;
    // if (card.ctaLinkData) {
    //   ctaLink = transformCtaLink(card.ctaLinkData);
    // } else if (card.ctaLink) {
    //   ctaLink = { sys: { contentType: { sys: { id: 'url' } } }, fields: { ctaLink: card.ctaLink } };
    // }

    if (card.ctaLink) {
      ctaLink = { sys: { contentType: { sys: { id: 'url' } } }, fields: { ctaLink: card.ctaLink } };
    }

    return {
      fields: {
        title: card?.title,
        text: card?.text,
        image: card?.image ? transformMedia(card.image) : undefined,
        logo: card?.logo ? transformMedia(card.logo) : undefined,
        ctaLabel: card?.ctaLabel,
        // ctaUrl: card.ctaUrl || null,
        ctaLink,
        ctaWillOpenModal: card?.ctaWillOpenModal,
        showAddressFields: card?.showAddressFields,
        address1: card?.address1,
        address2: card?.address2,
        bio: card?.bio,
        opacity: card?.opacity,
        shortDescription: card?.shortDescription,
      },
      sys: { id: String(card?.id || i) },
    };
  });
}

// ---------- Social Handles ----------

function transformSocialHandles(handles) {
  if (!Array.isArray(handles)) return [];
  return handles.map((handle) => ({
    fields: {
      ctaLink: { fields: { ctaLink: handle?.url || '' } },
      image: transformMedia(handle?.icon),
    },
    sys: { id: String(handle?.id || handle?.documentId || '') },
  }));
}

// ---------- Locations ----------

function transformLocations(locations) {
  if (!Array.isArray(locations)) return [];
  return locations
    .filter((loc) => !loc.ctfId)
    .map((loc, i) => ({
      fields: { title: loc?.title || '', repeater: loc?.repeater || [] },
      sys: { id: String(loc?.id || i) },
    }));
}

// ---------- Block helpers ----------

function transformPlatformTabs(tabs) {
  if (!Array.isArray(tabs)) return [];
  return tabs.map((tab) => ({
    fields: { title: tab?.title, iconIdentifier: tab?.iconIdentifier, content: tab?.content },
  }));
}

function transformContentSections(sections) {
  if (!Array.isArray(sections)) return [];
  return sections.map((sec) => ({
    fields: { title: sec?.title, iconIdentifier: sec?.iconIdentifier, content: sec?.content },
  }));
}

// ---------- Block ----------

function transformBlock(block) {
  const ctId = COMPONENT_MAP[block?.__component];
  const updatedAt = block?.updatedAt || '';
  let fields = {};

  switch (ctId) {
    case 'hero':
      fields = {
        ...block,
        background: transformMedia(block.background),
        video: transformMedia(block.video),
        ctaLink: transformCtaLink(block.ctaLink),
      };
      break;

    case 'numberstiles':
      fields = {
        ...block,
        tilesSectionBackground: transformMedia(block.tilesSectionBackground),
        tile1Image: transformMedia(block.tile1Image),
        tile2Image: transformMedia(block.tile2Image),
        tile3Image: transformMedia(block.tile3Image),
        tile4Image: transformMedia(block.tile4Image),
        tile5Image: transformMedia(block.tile5Image),
        tile6Image: transformMedia(block.tile6Image),
        tile1CtaLink: transformCtaLink(block.tile1CtaLink),
        tile2CtaLink: transformCtaLink(block.tile2CtaLink),
        tile3CtaLink: transformCtaLink(block.tile3CtaLink),
        tile4CtaLink: transformCtaLink(block.tile4CtaLink),
        tile5CtaLink: transformCtaLink(block.tile5CtaLink),
        tile6CtaLink: transformCtaLink(block.tile6CtaLink),
      };
      break;

    case 'ctaBanner':
      fields = {
        ...block,
        logo: transformMedia(block.logo),
        pdfDocument: transformMedia(block.pdfDocument),
      };
      break;

    case 'titleTextCta':
      fields = { ...block, ctaLink: transformCtaLink(block.ctaLink) };
      break;

    case 'animatedLogos':
      fields = {
        ...block,
        logosRow1: (block.logosRow1 || []).map(transformMedia).filter(Boolean),
        logosRow2: (block.logosRow2 || []).map(transformMedia).filter(Boolean),
      };
      break;

    case 'gallery':
      fields = {
        ...block,
        gallery: Array.isArray(block.gallery)
          ? block.gallery.map(transformMedia)
          : transformMedia(block.gallery),
      };
      break;

    case 'ctaSection':
      fields = {
        ...block,
        background: transformMedia(block.background),
        ctaLink: transformCtaLink(block.ctaLink),
        locations: transformLocations(block.locationsRef || block.locations || []),
      };
      break;

    case 'cards': {
      const cardItems = (block.cardItems || []).map(transformCard);
      const groupCardItems = (block.groupCardItems || []).map((gc) => ({
        fields: { year: gc.year, items: (gc.items || []).map(transformCard) },
        sys: { id: gc.documentId || String(gc.id) },
      }));

      const { cardItems: cardItemsFromBlock, groupCardItems: groupCardItemsBlock, ...rest } = block;

      fields = {
        ...rest,
        cards: block.cardType === 'grouped-timeline' ? groupCardItems : [...cardItems, ...groupCardItems],
      };
      break;
    }

    case 'mediatabs':
      fields = {
        ...block,
        background: transformMedia(block.background),
        tabs: transformPlatformTabs(block.tabs || []),
      };
      break;

    case 'tabbedContent':
      fields = {
        ...block,
        contentSections: transformContentSections(block.contentSections || []),
      };
      break;

    default:
      fields = { ...block };
  }

  delete fields.__component;
  delete fields.id;
  delete fields.documentId;
  delete fields.createdAt;
  delete fields.updatedAt;
  delete fields.publishedAt;

  return {
    sys: { contentType: { sys: { id: ctId } }, updatedAt },
    fields,
  };
}

function transformBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks.map(transformBlock).filter(Boolean);
}

// ---------- Page ----------

function transformPage(page) {
  if (!page) return {};
  return {
    fields: {
      name: page.name,
      slug: page.slug,
      headerBackgroundType: page.headerBackgroundType,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      seoImage: transformMedia(page.seoImage),
      seoKeywords: page.seoKeywords || [],
      preventIndexing: page.preventIndexing,
      blocks: transformBlocks(page.blocks || []),
    },
    sys: { id: String(page.id || page.documentId || '') },
  };
}

// ---------- Global Config ----------

function transformFooterLinks(links) {
  return (links || [])
    .filter((link) => link?.name || link?.slug)
    .map((link) => ({
      fields: { name: link?.name, slug: link?.slug },
      metadata: {},
      sys: { id: String(link?.documentId || link?.id || '') },
    }));
}

function transformHeaderMenuItems(items) {
  return (items || []).map((item) => {
    const hasSubItems = Array.isArray(item?.submenuItems) && item.submenuItems.length > 0;
    if (hasSubItems) {
      return {
        fields: {
          name: item?.name || item?.text || null,
          submenuItems: (item.submenuItems || []).map((sub) => ({
            fields: {
              name: sub?.name || sub?.text || null,
              text: sub?.text || null,
              link: sub?.pageLink
                ? { fields: { slug: sub.pageLink.slug || null, name: sub.pageLink.name || null } }
                : null,
            },
          })),
        },
      };
    }
    return {
      fields: {
        name: item?.name || item?.text || null,
        link: item?.pageLink
          ? { fields: { slug: item.pageLink.slug || null, name: item.pageLink.name || null } }
          : null,
      },
    };
  });
}

function transformGlobalConfig(config) {
  if (!config) return {};
  return {
    internalName: config.internalName,
    headerMenu: transformHeaderMenuItems(config.headerMenu || []),
    footerMenuColumn1Label: config.footerMenuColumn1Label,
    footerMenuColumn1Links: transformFooterLinks(config.footerMenuColumn1Links || []),
    footerMenuColumn2Label: config.footerMenuColumn2Label,
    footerMenuColumn2Links: transformFooterLinks(config.footerMenuColumn2Links || []),
    footerMenuColumn3Label: config.footerMenuColumn3Label,
    footerMenuColumn3Links: transformFooterLinks(config.footerMenuColumn3Links || []),
    footerMenuColumn4Label: config.footerMenuColumn4Label,
    footerMenuColumn4Links: transformFooterLinks(config.footerMenuColumn4Links || []),
    footerCopyright: config.footerCopyright,
    footerSocialMediaLabel: config.footerSocialMediaLabel,
    footerSocialMediaLink: config.footerSocialMediaLink || null,
    footerSocialMediaIcon: transformMedia(config.footerSocialMediaIcon),
    footerSecondaryMenu: transformFooterLinks(config.footerSecondaryMenu || []),
    suggestedLanguages: config.suggestedLanguages || [],
    suggestedSkills: config.suggestedSkills || [],
    departmentOptions: config.departmentOptions || [],
    headerPrefix: config.headerPrefix,
    websiteGroup: transformCards(config.websiteGroup || []),
    socialHandles: transformSocialHandles(config.social_handles || []),
  };
}

// ---------- Post ----------

function transformPost(post) {
  return {
    fields: {
      postType: post?.postType ?? null,
      title: post?.title ?? null,
      slug: post?.slug ?? null,
      createdAt: post?.cf_createdAt || post?.createdAt || null,
      category: post?.category ? transformTag(post.category) : null,
      mainImage: transformMedia(post?.mainImage) ?? null,
      numbers: post?.numbers || [],
      content: post?.content ?? null,
      postTags: (post?.postTags || []).map(transformTag),
      seoTitle: post?.seoTitle ?? null,
      seoDescription: post?.seoDescription ?? null,
      seoKeywords: post?.seoKeywords || [],
      preventIndexing: post?.preventIndexing ?? null,
    },
    sys: {
      id: String(post?.id || post?.documentId || ''),
      createdAt: post?.cf_createdAt || post?.createdAt || null,
    },
  };
}

// ---------- Product ----------

function transformProduct(product) {
  return {
    fields: {
      name: product?.name,
      mainImage: transformMedia(product?.mainImage),
      model: product?.model,
      description: product?.description,
      shortDescription: product?.shortDescription,
      productTags: (product?.productTags || []).map(transformTag),
      slug: product?.slug,
      keyFeatures: product?.keyFeatures || [],
      keyFeaturesImage: transformMedia(product?.keyFeaturesImage),
      video: transformMedia(product?.video),
      images: (product?.images || []).map(transformMedia).filter(Boolean),
      diagram: transformMedia(product?.diagram),
      technicalSpecification: (product?.technicalSpecifications || []).map(
        (spec, i) => ({
          fields: {
            title: spec?.title || '',
            repeater: (spec?.rows || []).map((row) => ({
              key: row.key,
              value: row.value,
            })),
          },
          sys: { id: String(spec?.id || i) },
        })
      ),
      dataSheetDocument: transformMedia(product?.dataSheetDocument),
      userManualDocument: transformMedia(product?.userManualDocument),
      seoTitle: product?.seoTitle,
      seoDescription: product?.seoDescription,
      seoKeywords: product?.seoKeywords || [],
      preventIndexing: product?.preventIndexing,
    },
    sys: {
      id: String(product?.id || product?.documentId || ''),
      createdAt: product?.cf_createdAt || product?.createdAt,
    },
  };
}

module.exports = {
  transformMedia,
  transformReference,
  transformCtaLink,
  transformTag,
  transformCard,
  transformCards,
  transformSocialHandles,
  transformBlock,
  transformBlocks,
  transformPage,
  transformPost,
  transformProduct,
  transformGlobalConfig,
};
