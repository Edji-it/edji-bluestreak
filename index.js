const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time') // middleware that adds header with the total elapsed time of call
const methodOverride = require("method-override")
const dotenv = require('dotenv').config()
const CONFIG = require('./config')

// set up error logging
const Sentry = require('@sentry/node')
Sentry.init({
  dsn: 'https://bcd046f935744bf2a204f53b7198dc27@sentry.io/1329616',
  environment: process.env.NODE_ENV
})

// configure express
let app = express()
app.use(Sentry.Handlers.requestHandler()) // adds details about errors to sentry
app.use(responseTime())
app.use(bodyParser.json({ limit: '20mb' }))

// import routes
const routes = require('./routes')

// add routes to express
app.use(routes)

// global error handling
app.use(methodOverride())
app.use(Sentry.Handlers.errorHandler()) // where sentry picks up its info and records it

// set up websocket server
const server = require('http').Server(app)
require("./Sockets.js")(server, { pingInterval: 15000, pingTimeout: 50000 })

// set port to listen on
const PORT = process.env.PORT

// start the server
server.listen(PORT, () => {
  console.log("bluestreak listening at port " + PORT)
})
server.timeout = 2000