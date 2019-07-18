const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath(__dirname + '/dist/')
    .setPublicPath('/dist')
    .addEntry('filer-client-js', ['whatwg-fetch', './src/LoggerClient.js'])
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .disableSingleRuntimeChunk()
    .configureTerserPlugin((options) => {
        options.terserOptions = {
            output: {
                comments: false
            }
        }
    })
;

module.exports = Encore.getWebpackConfig();
