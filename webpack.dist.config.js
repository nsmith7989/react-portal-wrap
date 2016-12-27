var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: [
        './src/index'
    ],
    output: {
        library: 'Redux Filter',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};
