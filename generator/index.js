const packages = require('./packages')

module.exports = api => {
  api.extendPackage(packages)
  api.render('./template')
}
