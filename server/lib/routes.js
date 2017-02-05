var Render = require('./module/render/Render')

module.exports = function(app) {
    // Render routes
    app.get('', Render.renderApp)
    app.get('/', Render.renderApp)

    // API routes

    // Misc routes
    app.get('/health', function(req, res) {
        res.type('text/plain')
        res.send(200)
    })

    app.use(function(req, res, next) {
        res.status(404).send('Sorry cant find that!')
    })
}
