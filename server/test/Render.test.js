var should = require('should')
  , rewire = require('rewire')
  , sinon = require('sinon')

require('should-sinon')

var Render = rewire('../lib/module/render/Render')

describe('Render', function() {
    describe('#renderApp()', function() {
        it('render index.pug with the write app name', function() {
            var req = {}
              , res = {}
              , tweets = []

            Render.__set__({
                clientStats: {
                    publicPath: 'http://some.path/'
                  , assetsByChunkName: {
                        main: 'appname.js'
                    }
                }
            })
            res.render = sinon.stub()

            Render.renderApp(req, res)

            res.render.should.be.calledWith('index.pug', {
                clientAppUrl: 'http://some.path/appname.js.gzip'
            })
        })
    })
})
