var express = require('express')
  , config = require('./config')
  , configure = require('./configure')

// For debugging
// var Q = require('q')
// Q.longStackSupport = true

process.on('uncaughtException', function (error) {
    var errorName = error.name || 'UnknownType'
      , errorMessage = error.message || 'Error without a message'
      , message = errorName + ': ' + errorMessage

    console.log(message)

    process.exit(1)
})

var app = express()

configure(app)

console.log('Listening on ' + config.host + ':' + config.port)

app.listen(config.port, config.host)
