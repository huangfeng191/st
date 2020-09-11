var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }

//path:编译路径地址， 原来 ./dist
module.exports = {
    entry: './src/main.js',
    output: {
        // 打包后文件存放的地方
        path: path.resolve(__dirname, './service/public/dist'),
        // publicPath 并不会对生成文件的路径造成影响，
        // 主要是对你的页面里面引入的资源的路径做对应的补全，常见的就是css文件里面引入的图片
        // 换句话说就是引入路径*************
        publicPath: '/dist/',
        filename: 'build.js'
    },
    externals: {

    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                     resolve('src'),
                     resolve('test'),
                     resolve('node_modules/vue-echarts'),
                     resolve('node_modules/resize-detector')
                   ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    /**
     devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 3000,
    host: '10.0.0.9',
    proxy: {
      '/test/*': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false
      }
    }
  },
     */

    devServer: {
        historyApiFallback: true,
        noInfo: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3333',
                changeOrigin: true,
                secure: false
            },
            '/baoxing/*': {
                target: 'http://localhost:8083',
                changeOrigin: true,
                secure: false
            }
        }
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {

    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin()({
            //sourceMap: true,  build 是否输出map内容
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // The plugin will generate an HTML5 file for you that includes 
        // all your webpack bundles in the body using script tags.
        //  Just add the plugin to your webpack config as follows:
/*         new HtmlWebpackPlugin({
            filename:'../index.html',
            // 已某个文件作为模板,在把生成的添加进去
            template:'./indexpro.html'
        }) */
        //  暂时还不会如何打包
    ])
}

