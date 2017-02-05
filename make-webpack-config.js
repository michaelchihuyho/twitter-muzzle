var webpack = require('webpack')
  , path = require('path')
  , StatsPlugin = require('stats-webpack-plugin')
  , CleanPlugin = require('clean-webpack-plugin')
  , CompressionPlugin = require('compression-webpack-plugin')

module.exports = function(options) {
    var mode = options.mode

    var target = ''
      , context = ''
      , entry = ''
      , output = {}
      , module = {}
      , resolve = {}
      , plugins = []

    // TARGET
    target = 'web'

    // CONTEXT
    context = __dirname

    // ENTRY
    if (mode === 'hot') {
        throw new Error('sorry hot reloading is broken for right now')
        entry = [
            'webpack-dev-server/client?http://localhost:3010'
          , 'webpack/hot/only-dev-server'
          , './client/src/app.js'
        ]
      } else if (mode === 'dev' || mode === 'build' || mode === 'publish'){
        entry = './client/src/app.js'
    }

    // OUTPUT
    if (mode === 'hot') {
        output.path = path.join(__dirname, 'client')
        output.filename = '[name].js'
        output.chunkFilename = '[id].js'
        output.publicPath = 'http://localhost:3010/'
    } else if (mode === 'dev' || mode === 'build' || mode === 'publish') {
        output.path = path.join(__dirname, 'client/static')
        output.filename = '[name].[hash].js'
        output.chunkFilename = '[id].js'
        output.publicPath= '/'
    }

    // LOADERS
    if (mode === 'hot') {
        module.rules = [
            {
                include: /\.js$/
              , use: ['react-hot-loader', 'babel-loader?cacheDirectory=true']
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
    } else if (mode === 'dev' || mode === 'build' || mode === 'publish') {
        module.rules = [
            {
                include: /\.js$/
              , use: ['babel-loader']
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
              , use: ['url-loader?limit=8192&name=images/[hash].[ext]']
            }
        ]
    }

    // PLUGINS
    if (mode === 'hot' || mode === 'dev') {
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

    return {
        target: target
      , context: context
      , entry: entry
      , output: output
      , module: module
      , resolve: resolve
      , plugins: plugins
    }
}
