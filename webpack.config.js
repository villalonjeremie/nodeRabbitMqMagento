const path = require('path');

module.exports = {
  entry: ["./global.js", "./app.js", "./index.jsx"],
  output: {
    filename: 'build/bundle.js',
    publicPath: '/src/static/'
   },
 watch: true,
 module: {
   loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'jshint-loader',
			//this is similar to defining a preloader
			enforce: 'pre'
		},
		{
            test: [/\.js$/, /\.es6$/, /\.jsx$/],
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
   ]
 },
 resolve: {
   extensions: ['*', '.js', '.es6']
  }
}
