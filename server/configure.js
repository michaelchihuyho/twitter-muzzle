var express = require('express')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , methodOverride = require('method-override')

var routes = require('./lib/routes')

module.exports = function(app) {

    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(methodOverride())

    app.use(function (req, res, next) {
        if (/\.gzip?/.test(req.url)) {
            res.set('Content-Encoding', 'gzip')
        }
        next()
    })
    app.use('/', express.static(__dirname + '/../client/static'))

    app.set('views', __dirname + '/views')
    app.set('view engine', 'html')

    // Check for CSRF
    // app.use(function(req, res, next) {
    //     if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    //         if (req.cookies['skeleton-csrf-secret'] && req.get('x-csrf-token') !== utils.dec(req.cookies['skeleton-csrf-secret'])) {
    //             return res.send(400, {
    //                 error: 'Invalid CSRF Token'
    //               , description: 'Please reload the page and try again'
    //             })
    //         } else {
    //             next()
    //         }
    //     } else {
    //         next()
    //     }
    // })

    return routes(app)
}
