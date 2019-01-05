const history = require('connect-history-api-fallback')
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

const oneHour = 3600000 * 4
app.use(express.static(staticDir, {
  index: false,
  maxAge: oneHour
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