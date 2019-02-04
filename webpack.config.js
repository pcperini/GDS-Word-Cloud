const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'word_cloud.js',
    path: path.resolve(__dirname, 'dist')
  }
};
