const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time') // middleware that adds header with the total elapsed time of call

// configure express
let app = express()
app.use(responseTime())
app.use(bodyParser.json({limit: '20mb'}))

// import routes
const routes = require('./routes')

// add routes to express
app.use(routes)

// set up socket server
const server = require('http').Server(app)
require("./Sockets.js")(server, { pingInterval: 15000, pingTimeout: 50000 })

// set port to listen on
const PORT = process.env.PORT || 7899

// start the server
server.listen(PORT, () => {
  console.log("bluestreak listening at port " + PORT)
})
server.timeout = 2000