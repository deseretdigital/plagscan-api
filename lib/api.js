const express = require('express');
const app = express();

const version = require('./api/version');
const submitDocument = require('./api/submitDocument');
const retrieveDocument = require('./api/retrieveDocument');

app.get('/', version);
app.post('/submit-document', submitDocument);
app.get('/retrieve-document', retrieveDocument);

module.exports = app;
