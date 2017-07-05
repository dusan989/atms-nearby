const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const METADATA = {
  GOOGLE_API_KEY: 'AIzaSyCdWkrVHdnJpcyv1TBPz5XtQesrTaPyX5M',
};

const isProd = process.env.NODE_ENV === 'prod';
const isDev = !isProd;

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
});

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    googleApiKey: METADATA.GOOGLE_API_KEY,
  }),
  extractSass,
  new DefinePlugin({
    GOOGLE_API_KEY: JSON.stringify(METADATA.GOOGLE_API_KEY),
  }),
];
if (isProd) {
  plugins.push(new UglifyJSPlugin());
}

module.exports = {
  entry: './src/index.js',
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    browsers: '> 1%',
                  }),
                ],
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },
  plugins,
};
