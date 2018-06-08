const path = require('path');

module.exports = {
	mode: 'production',
  	entry: {
  		may: './src/may.js',
  		june: './src/june.js'
  	},
  	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};