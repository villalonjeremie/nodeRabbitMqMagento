const path = require('path');

module.exports = {
  entry: ["./src/js/global.js", "./src/js/app.js", "./src/jsx/index.jsx","./mongodb/crud.js"],
  output: {
    filename: './build/bundle.js',
   },
 watch: true,
 module: {
   loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'jshint-loader',
			enforce: 'pre'
		},
		{
      test: [/\.js$/, /\.es6$/, /\.jsx$/],
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(js|html)$/,
      exclude: /node_modules/,
      loader: 'jsbeautify-loader',
      enforce: 'pre'
    } 
   ]
 },
 resolve: {
   extensions: ['*', '.js', '.es6']
  }
}
