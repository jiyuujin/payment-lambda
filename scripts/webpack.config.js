const webpack = require('webpack')

require('dotenv').config()

let define = {}
for (const k in process.env) {
    define[`process.env.${k}`] = JSON.stringify(process.env[k])
}

module.exports = {
    entry: './src/main.ts',
    output: {
        path: __dirname + '/docs',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(define)
    ]
}
