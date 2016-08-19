const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve('js/index.js'),
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' }
        ]
    },
    resolve: {
        alias: {
            threejs: path.resolve('js/lib/three.js'),
            cannon: 'cannon/src/cannon'
        },
        modulesDirectories: ['node_modules', 'js']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: /*{ except: ['THREE', 'app'] }*/ false,
            output: { comments: false }
        })
    ]
}
