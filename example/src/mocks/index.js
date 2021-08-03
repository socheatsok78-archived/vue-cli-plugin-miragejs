import { loadMocks } from './loadMocks'

/**
 * MirageJS API Mocking
 * @see https://miragejs.com/ — For documentations
 */
export const MirageMockServer = {
  started: false,
  server: null,
  config: {
    enabled: process.env.VUE_APP_MIRAGE_ENABLE || false,
    namespace: process.env.VUE_APP_MIRAGE_NAMESPACE || undefined,
    urlPrefix: process.env.VUE_APP_MIRAGE_URL_PREFIX || undefined,
    timing: parseInt(process.env.VUE_APP_MIRAGE_TIMING) || undefined
  },
  async start() {
    if (this.started) return
    this.started = true

    const createServer = require('miragejs').createServer
    const { mocks, models } = loadMocks()

    const server = createServer({
      namespace: this.config.namespace,
      urlPrefix: this.config.urlPrefix,
      timing: this.config.timing,
      models: models,
      seeds(server) {
        mocks.forEach(mock => {
          if (mock.seeds) mock.seeds(server)
        })
      },
      routes() {
        mocks.forEach(mock => {
          if (mock.routes) mock.routes(this)
        })

        this.passthrough()
        this.passthrough('http://localhost:8080/**')
        this.passthrough('http://httpstat.us/**')
      }
    })

    this.server = server

    return server
  }
}
