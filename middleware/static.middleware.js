const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const staticMiddleware = (app) => {
  app.set('view engine', 'ejs');
  app.set('views', 'views');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('short'));
  app.use(express.json());
  app.use(compression());
};

module.exports = staticMiddleware;
