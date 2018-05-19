const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('app', './assets/js/app.jsx')
    .addEntry('MessageApplication', './assets/js/message-app/MessageApplication.jsx')
    .addEntry('curriculum-app', './assets/curriculum-app/index.js')

    .enableSassLoader()
    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())
    .enableBuildNotifications()
    .enableReactPreset()
;

// changing the default uglifyJS to some that actually work.
const config = Encore.getWebpackConfig();

config.plugins = config.plugins.map(plugin => {
  if(plugin instanceof webpack.optimize.UglifyJsPlugin){
    return new UglifyJsPlugin();
  }
  return plugin;
})

module.exports = config;
