const express = require('express');
const app = express();

const version = require('./api/version');
const submitDocument = require('./api/submitDocument');
const retrieveDocument = require('./api/retrieveDocument');
const retrieveReportPassThrough = require('./api/retrieveReportPassThrough');

app.get('/', version);
app.post('/submit-document', submitDocument);
app.get('/retrieve-document', retrieveDocument);
app.get('/retrieve-document', retrieveDocument);
app.get('/retrieve-report-pass-through/:page', retrieveReportPassThrough);

module.exports = app;
