
const request = require('request');

module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index.ejs');
    });
};