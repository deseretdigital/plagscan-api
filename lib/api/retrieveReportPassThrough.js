const request = require('request');
const config = require('./../config');
const getToken = require('./../utils/getToken');

module.exports = function retrieveReportPassThrough(req, res) {
    getToken(req.headers['client-id'], req.headers.apikey, res)
        .then((token) => {
            const source = req.query.source || '0';
            let uri = config.base_url;
            switch (req.params.page) {
            case 'highlight':
            case 'getSource':
                uri += `/documents/${req.query.doc}/highlight?access_token=${token}&source=${source}`;
                break;
            case 'getdocx':
            case 'report':
            case 'view':
            case 'dlReport':
            case 'dlView':
            default:
                uri += `/documents/${req.query.doc}/retrieve?access_token=${token}&mode=6`;
            }
            request({
                method: 'GET',
                uri,
                headers: {
                    Accept: 'application/json'
                },
            }, (error, response, body) => {
                res.status(response.statusCode);
                if (error) {
                    res.send({
                        error: error.message
                    });
                } else if (response.statusCode === 200) {
                    res.send(body);
                } else {
                    try {
                        const bodyParsed = JSON.parse(body);
                        res.send({
                            error: bodyParsed.error && bodyParsed.error.message
                                ? bodyParsed.error.message : `Error retrieving document - ${response.statusCode}`
                        });
                    } catch (err) {
                        res.send({
                            error: err.message || 'An unknown error occured'
                        });
                    }
                }
            });
        })
        .catch((err) => {
            res.send({
                error: err.message
            });
        });
};
