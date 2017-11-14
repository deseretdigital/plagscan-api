const request = require('request');
const config = require('./../config');
const getToken = require('./../utils/getToken');

module.exports = function submitDocument(req, res) {
    getToken(req.headers['client-id'], req.headers.apikey, res)
        .then((token) => {
            const uri = req.query.htmlReport
                ? `${config.base_url}/documents/${req.query.docId}/retrieve?access_token=${token}&mode=6`
                : `${config.base_url}/documents/${req.query.docId}/retrieve/highlight?source=0&access_token=${token}`;
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
// 116557807
// 11328060
// 116558068
// 116558214
