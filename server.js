const express = require('express')
const path = require('path')
const healthCheck = require('topcoder-healthcheck-dropin')

const app = express()


function check () {
  // Return 200 OK for health check
  return true
}

app.use(healthCheck.middleware([check]))
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))
const port = process.env.PORT || 3000
app.listen(port)