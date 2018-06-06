const path = require('path');

module.exports = {
	mode: 'production',
  entry: './src/may.js',
  output: {
    filename: 'may.js',
    path: path.resolve(__dirname, 'dist')
  }
};