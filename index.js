var express = require('express')()
var server = require('http').Server(express)
require("./Sockets.js")(server, { pingInterval: 15000, pingTimeout: 50000 })

var PORT = process.env.PORT || 7899

server.listen(PORT, () => {
  console.log("bluestreak listening at port " + PORT)
})
server.timeout = 2000