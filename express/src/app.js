const history = require('connect-history-api-fallback')
const serveStatic = require('serve-static')
const express = require('express')
const cors = require('cors')
const path = require('path')

const devMode = process.argv[2] === 'dev'
const staticDir = path.resolve(devMode ? '../dist' : './dist')
const app = express()
const port = process.env.PORT || 8100

app.use(cors())
app.use(express.json())
app.use(history())

app.set('port', port)
app.set('view cache', !devMode)
app.set('views', path.join(__dirname, staticDir))

const noCacheForIndex = (res, path) => {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}

app.use(serveStatic(staticDir, {
  index: false,
  // maxAge: '1h',
  setHeaders: noCacheForIndex
}))

app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'))
})

if (devMode) {
  let listener = app.listen(port, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })
}

module.exports = app