import client from '../lib/client';

const TEMPLATE_OPTIONS = { interpolate: /\{\{(.+?)\}\}/g };

/**
 * Parses the JSON Array of URI Templates from the app's settings.
 * @param {Object} uri_templates - URI Templates from app settings
 */
export function getUrisFromSettings({ uri_templates }) {
  return JSON.parse(uri_templates);
};

/**
 * Replace placeholders in URIs with data from context.
 * @param {Array} uris - An array of JSON URI Objects, with a title and URIs.  The URIs have placeholders (See README).
 * @param {Object} context - An object containing user and ticket data.
 */
export function buildTemplatesFromContext(uris, context) {
  return _.map(uris, uri => {
    uri.url = _.template(uri.url, TEMPLATE_OPTIONS)(context)
    uri.title = _.template(uri.title, TEMPLATE_OPTIONS)(context)

    return uri;
  });
}

/**
 * Retreives user data before building it into a single `context` object
 * used to replace our placeholders in the URIs with real data.
 */
async function getContext() {
  const { visitor } = await client.get('visitor');
  return { visitor }
}

export default getContext;
