var Render = function Render() {}

Render.prototype.renderApp = function renderApp(req, res, next) {
    var stats = require('../../../../client/static/stats.json')

    var csrfToken
      , publicPath
      , clientAppUrl

    // csrfToken = random.random_base62(30)

    // res.cookie('reach-csrf-token', csrfToken, {path: '/'})
    // res.cookie('reach-csrf-secret', utils.enc(csrfToken), {path: '/'})

    publicPath = stats.publicPath
    // TODO: serve the gzipped file!
    clientAppUrl = publicPath + stats.assets[0].name

    res.render('index.pug', {
        clientAppUrl: clientAppUrl
    })
}


module.exports = new Render()
