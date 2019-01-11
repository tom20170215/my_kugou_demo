require('./check-versions')();

var config = require('../config');
if(!process.env.NODE_ENV){
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.conf');
var proxyTable = config.dev.proxyTable;
var port  = process.env.PORT||config.dev.port;
const app = new express();

const compiler = webpack(webpackConfig);


