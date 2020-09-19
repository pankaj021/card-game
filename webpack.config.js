const path = require('path')
const PATHS = {
    indexJs: path.join(__dirname, 'ui/index.js'),
    build: path.join(__dirname, 'public/bundle')
}

module.exports = {
    entry: ["babel-polyfill", PATHS.indexJs],
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },
    watch: true,
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.css$/, use:['style-loader', 'css-loader']},
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true }
                  }
                ]
            }
        ]
    }
};