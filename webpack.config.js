const webpack = require('webpack');

module.exports = {
    entry: './js/index.js',
    output: {
        path: './bin',
        filename: 'index.bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false }
        })
    ]
}
