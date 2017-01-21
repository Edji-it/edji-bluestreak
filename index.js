var express = require('express')()
var server = require('http').Server(express)
require("./Sockets.js")(server)

var PORT = process.env.PORT || 7899

server.listen(PORT, () => {
  console.log("bluestreak listening at port " + PORT)
})
server.timeout = 2000