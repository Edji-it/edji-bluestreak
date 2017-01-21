var express = require('express')
var app = express()

var BumbleBot = require('./lib/bumblebee')

app.use(bodyParser.json())

var PORT = process.env.PORT || 7899

var server = require('http').createServer(app)
require("./Sockets.js")(server)

app.listen(PORT, () => {
  console.log("bumblebee listening at port " + PORT)
})
app.timeout = 2000