const webpack = require('webpack');

module.exports = {
  entry: ['whatwg-fetch', './frontend/app.jsx'],
  devServer:{
    inline:true,
    progress:true,
    contentBase:'public',
    historyApiFallback: true
  },
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [' ', '.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({minimize:true}),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.AggressiveMergingPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('production')}
    })
  ],
  module:{
    loaders:[
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude:/node_modules/,
        query: {
          // Here you can put plugins, like plugins:['transform-runtime']
          plugins:[
	          'transform-decorators-legacy',
            'transform-class-properties',
            'transform-react-inline-elements',
            'transform-react-constant-elements'
          ],
          presets: [['es2015', {modules: false}], 'react', 'stage-3']
        }
      }]
  }
};
