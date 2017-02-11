var webpack = require('webpack')
  , path = require('path')
  , StatsPlugin = require('stats-webpack-plugin')
  , CleanPlugin = require('clean-webpack-plugin')
  , CompressionPlugin = require('compression-webpack-plugin')
  , serverConfig = require('./server/config')

module.exports = function(options) {
    var mode = options.mode

    var target = ''
      , context = ''
      , entry = ''
      , output = {}
      , module = {}
      , resolve = {}
      , plugins = []
      , devServer = {}

    // TARGET
    target = 'web'

    // CONTEXT
    context = __dirname

    // ENTRY
    if (mode === 'hot') {
        entry = [
            'react-hot-loader/patch'
          , 'webpack-dev-server/client?http://localhost:3000'
          , 'webpack/hot/only-dev-server'
          , './client/src/index.js'
        ]
      } else if (mode === 'dev' || mode === 'build' || mode === 'publish'){
        entry = './client/src/index.js'
    }

    // OUTPUT
    if (mode === 'hot') {
        output.filename = '[name].js'
        output.publicPath = '/static/'
    } else if (mode === 'dev' || mode === 'build' || mode === 'publish') {
        output.path = path.join(__dirname, 'client/static')
        output.filename = '[name].[hash].js'
        output.chunkFilename = '[id].js'
        output.publicPath= '/'
    }

    // LOADERS
    module.rules = [
        {
            include: /\.js$/
          , use: ['babel-loader?cacheDirectory=true']
          , exclude: /node_modules/
        }
      , {
            include: /\.less$/
          , use: ['style-loader', 'css-loader', 'less-loader']
          , exclude: /node_modules/
        }
      , {
            include: /\.woff$/
          , use: ['url-loader?limit=100000']
        }
      , {
            include: /\.(png|jpg|svg)$/
          , use: ['url-loader?limit=8192&name=images/[name].[ext]']
        }
    ]

    // PLUGINS
    if (mode === 'hot') {
        plugins = [
            new webpack.HotModuleReplacementPlugin()
          , new webpack.NamedModulesPlugin()
          , new webpack.NoEmitOnErrorsPlugin()
          , new webpack.DefinePlugin({
                __DEV__: true
            })
        ]
    } else if (mode === 'dev') {
        plugins = [
            new CleanPlugin(['*'], {
                root: path.join(__dirname, 'client/static')
            })
          , new StatsPlugin('stats.json', {
                chunkModules: true
              , exclude: [/node_modules[\\\/]react(-router)?[\\\/]/]
            })
          , new webpack.NoEmitOnErrorsPlugin()
          , new webpack.DefinePlugin({
                __DEV__: true
            })
        ]
    } else if (mode === 'build' || mode === 'publish') {
        // TODO: add s3 plugin for publish mode only
        plugins = [
            new CleanPlugin(['static'], {
                root: path.join(__dirname, 'client')
            })
          , new StatsPlugin('stats.json', {
                chunkModules: true
              , exclude: [/node_modules[\\\/]react(-router)?[\\\/]/]
            })
          , new webpack.DefinePlugin({
                __DEV__: false
            })
          , new webpack.optimize.UglifyJsPlugin()
          , new CompressionPlugin({
                asset: '[file].gzip'
              , regExp: /\.js$/
              , threshold: 10240
              , minRatio: 0.8
            })
        ]
    }

    // DEV SERVER
    devServer.host = 'localhost'
    devServer.port = 3000
    devServer.proxy = {
        '/api': 'http://localhost:' + serverConfig.port
    }
    devServer.historyApiFallback = {
        rewrites: [
            {from: /./, to: '/server/views/hot-reload-index.html' }
        ]
    }
    devServer.hot = true

    return {
        target: target
      , context: context
      , entry: entry
      , output: output
      , module: module
      , resolve: resolve
      , plugins: plugins
      , devServer: devServer
    }
}
