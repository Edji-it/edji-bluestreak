var express = require('express')

var PORT = process.env.PORT || 7899

var app = express()

var server = require('http').createServer(app)
require("./Sockets.js")(server, { pingInterval: 15000, pingTimeout: 50000 })

// Access allowed for development
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    var oneof = false
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Credentials', true)
        oneof = true
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method'])
        oneof = true
    }

    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
        oneof = true
    } 

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})

server.listen(PORT, () => {
  console.log("bluestreak listening at port " + PORT)
})
server.timeout = 2000

module.exports = server