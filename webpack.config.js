var path = require("path");



module.exports = {

    entry: "./js/app.js",

    output: {

        filename: "js/out.js",

        path: path.resolve(__dirname, ".")

    },

    mode : 'development',

    devtool: "source-map",

    watch : false,

    module : {

        rules: [

            {

                test: /\.js$/,

                exclude: /node_modules/,

                use: {

                    loader: 'babel-loader',

                    options: {

                        presets: [

                            ["env", {

                                targets: {

                                    browsers: ['last 2 versions']

                                }

                            }]

                        ]

                    }

                }

            },

            {

                test: /\.css$/,

                use: [

                    'style-loader',

                    'css-loader'

                ]

            },

            {

                test: /\.scss$/,

                use: [

                    'style-loader',

                    'css-loader',

                    'sass-loader'

                ]

            },

        ]

    }

}