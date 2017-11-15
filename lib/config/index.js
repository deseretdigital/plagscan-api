const config = process.env.NODE_ENV === 'production' ? {
    base_url: 'https://api.plagscan.com/v3'
} : {
    base_url: 'https://api.plagscan.com/v3',
    token_override: 'ca31ca2e74c84512a8554a069b0f985068804b05'
};
module.exports = config;
