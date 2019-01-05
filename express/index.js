const app = require('./src/app')

exports.mustread = function(req, res) {
  if (!req.url) {
    req.url = '/'
    req.path = '/'
  }
  return app(req, res)
}