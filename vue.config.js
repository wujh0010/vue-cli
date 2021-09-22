/* eslint-disable */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const {name} = require('./package');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8000; // dev port

module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  transpileDependencies: ['single-spa', 'qiankun', 'import-html-entry'],
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  crossorigin: 'anonymous',
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除console
            }
          }
        })
      ]
    },
    plugins: [
      new Dotenv({
        path: `./envs/${process.env.NODE_ENV}.env`
      })
    ]
  },
  chainWebpack: config => {
    if(process.env.NODE_ENV !== 'lib') {
      config
        .plugin('html')
        .tap(args => {
          args[0].name = name;
          args[0].title = '商家端组件库';
          args[0].env = process.env.NODE_ENV;
          return args
        })
    }
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: true,
      files: ['src/**/*.vue', 'src/assets/styles/*.l?(e|c)ss']
    }
  }
};
