const path = require('path');

module.exports = {
  entry: ["./src/js/global.js", "./src/js/app.js", "./src/jsx/index.jsx"],
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
