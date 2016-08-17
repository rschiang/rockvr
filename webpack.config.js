const webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: './bin',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false }
        })
    ]
}
