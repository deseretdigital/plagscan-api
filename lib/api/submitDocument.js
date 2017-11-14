const request = require('request');
const config = require('./../config');
const getToken = require('./../utils/getToken');

module.exports = function submitDocument(req, res) {
    getToken(req.headers['client-id'], req.headers.apikey, res)
        .then((token) => {
            request({
                method: 'POST',
                uri: `${config.base_url}/documents`,
                headers: {
                    'Content-Type': 'x-www-form-urlencoded',
                    Accept: 'application/json'
                },
                form: {
                    access_token: token,
                    textdata: req.body.text,
                    textname: req.body.name || null
                }
            }, (error, response, body) => {
                const bodyParsed = JSON.parse(body);
                res.status(response.statusCode);
                if (error) {
                    res.send({
                        error: error.message
                    });
                } else if (response.statusCode === 201) {
                    res.send({
                        docId: bodyParsed.data.docID
                    });
                } else {
                    res.send({
                        error: bodyParsed.error && bodyParsed.error.message
                            ? bodyParsed.error.message : `Error submitting document - ${response.statusCode}`
                    });
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
