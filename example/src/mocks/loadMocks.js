const modelReducer = (mocks = []) => {
  return mocks.reduce((acc, cur) => ({ ...acc, ...('models' in cur ? cur.models : {}) }), {})
}


/**
 * Dynamically load all mocks
 * @returns {LoadedModules}
 */
export function loadMocks () {
  const context = require.context('./__mocks__', true, /\.mock\.js?$/)
  const mocks = context.keys().map((key) => context(key).default)
  const models = modelReducer(mocks)

  return { mocks, models, context }
}


/**
 * @typedef LoadedModules
 * @property {RequireContext} context
 * @property {import('miragejs/server').ServerConfig[]} mocks
 * @property {Record<string, import('miragejs/-types').ModelDefinition>} models
 */

/**
 * @typedef RequireContext
 * @property {string} id
 * @property {function} keys
 * @property {function} resolve
 */
