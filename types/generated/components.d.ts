import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_cards';
  info: {
    displayName: 'Card';
    icon: 'layout';
  };
  attributes: {
    address1: Schema.Attribute.String;
    address2: Schema.Attribute.String;
    bio: Schema.Attribute.Text;
    ctaLabel: Schema.Attribute.String;
    ctaLinkData: Schema.Attribute.JSON;
    ctaWillOpenModal: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    opacity: Schema.Attribute.Enumeration<['light', 'dark']>;
    shortDescription: Schema.Attribute.Text;
    showAddressFields: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface ElementsGroupCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_group_cards';
  info: {
    displayName: 'Group Card';
    icon: 'grid';
  };
  attributes: {
    cf_items: Schema.Attribute.JSON;
    year: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ElementsTab extends Struct.ComponentSchema {
  collectionName: 'components_elements_tabs';
  info: {
    displayName: 'Tab';
    icon: 'layer';
  };
  attributes: {
    hideTabs: Schema.Attribute.JSON;
    tagsRef: Schema.Attribute.JSON;
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsAnimatedLogos extends Struct.ComponentSchema {
  collectionName: 'components_sections_animated_logos';
  info: {
    displayName: 'Animated Logos';
    icon: 'picture';
  };
  attributes: {
    logoColor: Schema.Attribute.Enumeration<['greyscale', 'color']> &
      Schema.Attribute.DefaultTo<'greyscale'>;
    logosRow1: Schema.Attribute.Media<'images', true>;
    logosRow2: Schema.Attribute.Media<'images', true>;
    noPadding: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_cards_sections';
  info: {
    displayName: 'Cards Section';
    icon: 'apps';
  };
  attributes: {
    cardItems: Schema.Attribute.Relation<'oneToMany', 'api::card.card'>;
    cardType: Schema.Attribute.Enumeration<
      [
        'feature-cards',
        'large-cta-cards',
        'small-cta-cards',
        'full-width-cards',
        'platform-cards',
        'team-member-cards',
        'scrollable-cards',
        'grouped-timeline',
        'company-cards',
        'contact-cards',
      ]
    > &
      Schema.Attribute.Required;
    disableModal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    groupCardItems: Schema.Attribute.Relation<
      'oneToMany',
      'api::group-card.group-card'
    >;
    internalName: Schema.Attribute.String;
    noOverlay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    displayName: 'CTA Banner';
    icon: 'megaphone';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    largeText: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'>;
    pdfDocument: Schema.Attribute.Media<'files'>;
    showDownloadForm: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text;
  };
}

export interface SectionsCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_sections';
  info: {
    displayName: 'CTA Section';
    icon: 'cursor';
  };
  attributes: {
    background: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    ctaLabel: Schema.Attribute.String;
    ctaLinkRef: Schema.Attribute.JSON;
    darkText: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hideOverlay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locationsRef: Schema.Attribute.JSON;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFormSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_sections';
  info: {
    displayName: 'Form Section';
    icon: 'envelope';
  };
  attributes: {
    formType: Schema.Attribute.Enumeration<
      ['job-application-form', 'contact-form']
    > &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'picture';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaValue: Schema.Attribute.String;
    gallery: Schema.Attribute.Media<'images', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'monitor';
  };
  attributes: {
    background: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    ctaLabel: Schema.Attribute.String;
    ctaLinkRef: Schema.Attribute.JSON;
    heroType: Schema.Attribute.Enumeration<['classic', 'sticky', 'overlay']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'classic'>;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos'>;
  };
}

export interface SectionsMediaTabs extends Struct.ComponentSchema {
  collectionName: 'components_sections_media_tabs';
  info: {
    displayName: 'Media Tabs';
    icon: 'play';
  };
  attributes: {
    background: Schema.Attribute.Media<'images' | 'videos'>;
    hideTabs: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    tabsRef: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsNumbersTiles extends Struct.ComponentSchema {
  collectionName: 'components_sections_numbers_tiles';
  info: {
    displayName: 'Numbers Tiles';
    icon: 'grid';
  };
  attributes: {
    hideTilesSection: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    numbersSectionNumbers: Schema.Attribute.JSON;
    numbersSectionTitle: Schema.Attribute.String;
    tile1CtaLabel: Schema.Attribute.String;
    tile1CtaRef: Schema.Attribute.JSON;
    tile1Image: Schema.Attribute.Media<'images'>;
    tile1Text: Schema.Attribute.RichText;
    tile1Title: Schema.Attribute.String;
    tile2CtaLabel: Schema.Attribute.String;
    tile2CtaRef: Schema.Attribute.JSON;
    tile2Image: Schema.Attribute.Media<'images'>;
    tile2Text: Schema.Attribute.RichText;
    tile2Title: Schema.Attribute.String;
    tile3CtaLabel: Schema.Attribute.String;
    tile3CtaRef: Schema.Attribute.JSON;
    tile3Image: Schema.Attribute.Media<'images'>;
    tile3Text: Schema.Attribute.RichText;
    tile3Title: Schema.Attribute.String;
    tile4CtaLabel: Schema.Attribute.String;
    tile4CtaRef: Schema.Attribute.JSON;
    tile4Image: Schema.Attribute.Media<'images'>;
    tile4Text: Schema.Attribute.RichText;
    tile4Title: Schema.Attribute.String;
    tile5CtaLabel: Schema.Attribute.String;
    tile5CtaRef: Schema.Attribute.JSON;
    tile5Image: Schema.Attribute.Media<'images'>;
    tile5Text: Schema.Attribute.RichText;
    tile5Title: Schema.Attribute.String;
    tile6CtaLabel: Schema.Attribute.String;
    tile6CtaRef: Schema.Attribute.JSON;
    tile6Image: Schema.Attribute.Media<'images'>;
    tile6Text: Schema.Attribute.RichText;
    tile6Title: Schema.Attribute.String;
    tilesSectionBackground: Schema.Attribute.Media<'images' | 'videos'>;
    tilesSectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsTabbedContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_tabbed_contents';
  info: {
    displayName: 'Tabbed Content';
    icon: 'layer';
  };
  attributes: {
    contentSectionsRef: Schema.Attribute.JSON;
    internalName: Schema.Attribute.String;
  };
}

export interface SectionsTitleRepeater extends Struct.ComponentSchema {
  collectionName: 'components_sections_title_repeaters';
  info: {
    displayName: 'Title Repeater';
    icon: 'list';
  };
  attributes: {
    identifier: Schema.Attribute.String;
    repeater: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTitleRichtext extends Struct.ComponentSchema {
  collectionName: 'components_sections_title_richtexts';
  info: {
    displayName: 'Title RichText';
    icon: 'pen';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    iconIdentifier: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTitleTextCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_title_text_ctas';
  info: {
    displayName: 'Title Text CTA';
    icon: 'file-alt';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaLinkRef: Schema.Attribute.JSON;
    hasBackground: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    limitSideTitleWidth: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    mainText: Schema.Attribute.RichText;
    mainTextColumns: Schema.Attribute.Enumeration<['One', 'Two']> &
      Schema.Attribute.DefaultTo<'One'>;
    mainTextSize: Schema.Attribute.Enumeration<['Small', 'Big']> &
      Schema.Attribute.DefaultTo<'Small'>;
    mainTitle: Schema.Attribute.String;
    sideText: Schema.Attribute.String;
    sideTextSize: Schema.Attribute.Enumeration<['Default', 'Smaller']> &
      Schema.Attribute.DefaultTo<'Default'>;
    sideTitle: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedUrl extends Struct.ComponentSchema {
  collectionName: 'components_shared_urls';
  info: {
    displayName: 'URL';
    icon: 'link';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.card': ElementsCard;
      'elements.group-card': ElementsGroupCard;
      'elements.tab': ElementsTab;
      'sections.animated-logos': SectionsAnimatedLogos;
      'sections.cards': SectionsCards;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.cta-section': SectionsCtaSection;
      'sections.form-section': SectionsFormSection;
      'sections.gallery': SectionsGallery;
      'sections.hero': SectionsHero;
      'sections.media-tabs': SectionsMediaTabs;
      'sections.numbers-tiles': SectionsNumbersTiles;
      'sections.tabbed-content': SectionsTabbedContent;
      'sections.title-repeater': SectionsTitleRepeater;
      'sections.title-richtext': SectionsTitleRichtext;
      'sections.title-text-cta': SectionsTitleTextCta;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.url': SharedUrl;
    }
  }
}
