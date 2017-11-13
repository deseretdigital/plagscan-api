const express = require('express');
const app = express();

const version = require('./api/version');

app.get('/', version);

module.exports = app;
