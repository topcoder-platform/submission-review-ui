const express = require('express')
const path = require('path')

const app = express()

// the __dirname is the current directory from where the script is running

app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))
const port = process.env.PORT || 3000
app.listen(port)

console.log(`App is listening on port ${port}`)


