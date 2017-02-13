var clientStats = require('../../../../client/static/stats.json')

var Render = function Render() {}

Render.prototype.renderApp = function renderApp(req, res, next) {

    var csrfToken
      , publicPath
      , clientAppUrl

    // csrfToken = random.random_base62(30)

    // res.cookie('reach-csrf-token', csrfToken, {path: '/'})
    // res.cookie('reach-csrf-secret', utils.enc(csrfToken), {path: '/'})

    publicPath = clientStats.publicPath
    clientAppUrl = publicPath + clientStats.assetsByChunkName.main + '.gzip'

    res.render('index.pug', {
        clientAppUrl: clientAppUrl
    })
}


module.exports = new Render()
