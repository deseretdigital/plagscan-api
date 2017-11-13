/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const api = require('../lib/api');

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('x-Mount-Path', app.mountpath);
    next();
});

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', api);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
/* eslint-enable no-console */
