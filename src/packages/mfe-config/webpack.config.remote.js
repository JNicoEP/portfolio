// src/packages/mfe-config/webpack.config.remote.js
/**
 * Configuración Enterprise de Module Federation para compilar y exponer
 * el Microfrontend de React como un Remote independiente.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/packages/portfolio-react/index.ts',
  mode: 'production',
  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'portfolio_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './PortfolioComponent': './src/packages/portfolio-react/index.ts',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0 || ^19.0.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0 || ^19.0.0',
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      templateContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Portfolio Remote</title></head><body><div id="root"></div></body></html>`,
    }),
  ],
};
