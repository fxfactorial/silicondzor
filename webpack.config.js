const webpack = require('webpack');
module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill', 
    'react-hot-loader/patch',
		'webpack-hot-middleware/client',
    'whatwg-fetch', 
    './frontend/app.jsx'
  ],
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
  module: {
    loaders:[
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude:/node_modules/,
        query: {
          // Here you can put plugins, like plugins:['transform-runtime']
          plugins:[
	          // This order matters, apparently decorators must come
	          // before class properties
	          'transform-decorators-legacy',
	          'transform-class-properties'
	        ],
          presets: ['es2015', 'react', 'stage-3']
        }
      }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ]
};
