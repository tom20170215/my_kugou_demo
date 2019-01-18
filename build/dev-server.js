require('./check-versions')();

var config = require('../config');
if(!process.env.NODE_ENV){
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');
const webpackDevMiddleware = require('webpack-dev-middleware');
var proxyTable = config.dev.proxyTable;
var port  = process.env.PORT||config.dev.port;
const app = new express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler,{
    publicPath: webpackConfig
}))


