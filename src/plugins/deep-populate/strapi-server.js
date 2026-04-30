"use strict";

const queryCache = {};

// 1. HELPER: Robust Schema Lookup
const getSchema = (uid) => {
  return strapi.getModel(uid) || strapi.components[uid];
};

// 2. HELPER: Recursive Populate Query Builder (From your snippet)
const getPopulateQuery = (modelUid, parentsModelUids = []) => {
  try {
    // Note: Changed plugin name to 'deep-populate' to match your local setup
    const plugin = strapi.plugin("deep-populate");
    const useCache = plugin ? (plugin.config("cache") ?? true) : true;

    if (useCache && queryCache[modelUid]) {
      // strapi.log.debug(`[deep-populate] query cache hit: ${modelUid}`);
      return structuredClone(queryCache[modelUid]);
    }

    if (parentsModelUids.includes(modelUid)) {
      strapi.log.debug(`[deep-populate] loop detected skipping: ${modelUid}`);
      return { populate: {} };
    } else {
      parentsModelUids.push(modelUid);
    }

    const query = { populate: {} };
    const model = getSchema(modelUid);

    if (!model) return true; // Fallback

    for (const [fieldName, attribute] of Object.entries(
      model.attributes || {},
    )) {
      if (fieldName === "localizations") {
        if (model.pluginOptions?.i18n?.localized) {
          query.populate[fieldName] = true;
        }
        continue;
      }

      if (attribute.type === "dynamiczone") {
        const components = Object.fromEntries(
          attribute.components.map((component) => [
            component,
            getPopulateQuery(component, parentsModelUids),
          ]),
        );
        query.populate[fieldName] = { on: components };
        continue;
      }

      if (attribute.type === "component") {
        query.populate[fieldName] = getPopulateQuery(
          attribute.component,
          parentsModelUids,
        );
        continue;
      }

      if (attribute.type === "relation") {
        if (attribute.private === true) continue;

        // Check config for relations
        const plugin = strapi.plugin("deep-populate");
        const relations = plugin ? plugin.config("relations") : true;

        if (relations === true) {
          query.populate[fieldName] = getPopulateQuery(
            attribute.target,
            parentsModelUids,
          );
          continue;
        }
        if (Array.isArray(relations) && relations.includes(attribute.target)) {
          query.populate[fieldName] = getPopulateQuery(
            attribute.target,
            parentsModelUids,
          );
          continue;
        }
      }

      if (attribute.type === "media") {
        query.populate[fieldName] = true;
      }
    }

    if (Object.keys(query.populate).length === 0) {
      query.populate = true;
    }

    if (useCache) {
      queryCache[modelUid] = query;
    }
    return structuredClone(query);
  } catch (error) {
    console.error(
      `[deep-populate] getPopulateQuery(${modelUid}) failed: ${error}`,
    );
    return undefined;
  }
};

// 3. HELPER: Inject Component Names (THE MISSING PIECE)
const injectComponentNames = (data, uid) => {
  if (!data || typeof data !== "object") return data;

  const schema = getSchema(uid);
  if (!schema) return data;

  const processItem = (item) => {
    if (!item) return;

    Object.keys(item).forEach((key) => {
      const attr = schema.attributes[key];
      if (!attr) return;

      // Handle Components (Inject Name + Recurse)
      if (attr.type === "component") {
        const compData = item[key];
        const compUid = attr.component;

        if (Array.isArray(compData)) {
          compData.forEach((subItem) => {
            if (subItem) {
              subItem.__component = compUid; // <--- INJECTION HAPPENS HERE
              injectComponentNames(subItem, compUid);
            }
          });
        } else if (compData) {
          compData.__component = compUid; // <--- INJECTION HAPPENS HERE
          injectComponentNames(compData, compUid);
        }
      }
      // Handle Dynamic Zones (Recurse only)
      else if (attr.type === "dynamiczone") {
        const dzData = item[key];
        if (Array.isArray(dzData)) {
          dzData.forEach((subItem) => {
            if (subItem && subItem.__component) {
              injectComponentNames(subItem, subItem.__component);
            }
          });
        }
      }
    });
  };

  if (Array.isArray(data)) {
    data.forEach(processItem);
  } else {
    processItem(data);
  }

  return data;
};

// 4. BOOTSTRAP: Register Lifecycles
const bootstrap = ({ strapi }) => {
  strapi.db.lifecycles.subscribe((event) => {
    try {
      // PHASE 1: Build the Query (Before Fetch)
      if (
        event.action === "beforeFindMany" ||
        event.action === "beforeFindOne"
      ) {
        if (event.params?.populateAll) {
          // strapi.log.debug(`[deep-populate] recursively populate ${event.model.uid}`);
          const populateQuery = getPopulateQuery(event.model.uid);
          if (populateQuery?.populate) {
            event.params.populate = populateQuery.populate;
          }
        }
      }

      // PHASE 2: Inject Names (After Fetch)
      if (event.action === "afterFindMany" || event.action === "afterFindOne") {
        if (event.params?.populateAll && event.result) {
          // strapi.log.debug(`[deep-populate] injecting names for ${event.model.uid}`);
          injectComponentNames(event.result, event.model.uid);
        }
      }
    } catch (error) {
      console.error(`[
        -populate] lifecycle error: ${error}`);
    }
  });
};

const config = {
  default: {
    relations: true,
    cache: true,
  },
  validator() {}, // Simplified validator
};

const middlewares = {
  populateAll: async (ctx, next) => {
    // Detect ?populate=all, ?populate=deep, or ?populate=*
    if (ctx.query.populate === "all" || ctx.query.populate === "deep" || ctx.query.populate === "*") {
      ctx.query.populate = undefined;
      ctx.query.populateAll = true; // Set the flag for lifecycle hooks
    }
    await next();
  },
};

const register = ({ strapi }) => {
  strapi.server.use(middlewares.populateAll);
};

module.exports = {
  config,
  register,
  bootstrap,
};
