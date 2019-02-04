const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'word_cloud.js',
    path: path.resolve(__dirname, 'dist')
  }
};
