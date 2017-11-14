const request = require('request');
const config = require('./../config');
const tokens = {};

module.exports = function getToken(clientId, apiKey, res) {
    const ok = 200;
    return new Promise((resolve, reject) => {
        if (tokens[clientId] && Date.now() < tokens[clientId].expires) {
            res.status(ok);
            resolve(tokens[clientId].token);
        } else {
            request({
                method: 'POST',
                uri: `${config.base_url}/token`,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: apiKey
                })
            }, (error, response, body) => {
                const bodyParsed = JSON.parse(body);
                res.status(response.statusCode);
                if (error) {
                    tokens[clientId] = null;
                    reject(error);
                } else if (response.statusCode === ok) {
                    if (bodyParsed.error) {
                        tokens[clientId] = null;
                        reject(new Error(bodyParsed.error.message, bodyParsed.error.code));
                    } else {
                        tokens[clientId] = {
                            token: bodyParsed.access_token,
                            expires: Date.now() + bodyParsed.expires_in
                        };
                        resolve(bodyParsed.access_token);
                    }
                } else {
                    tokens[clientId] = null;
                    reject(new Error(bodyParsed.error && bodyParsed.error.message
                        ? bodyParsed.error.message : `Received status code ${response.statusCode}`));
                }
            });
        }
    });
};
