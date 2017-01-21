var express = require('express')
var app = express()

app.use(bodyParser.json())

var PORT = process.env.PORT || 7899

var server = require('http').createServer(app)
require("./Sockets.js")(server)

app.listen(PORT, () => {
  console.log("bluestreak listening at port " + PORT)
})
app.timeout = 2000