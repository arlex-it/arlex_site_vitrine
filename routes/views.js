const sendMail = require('../public/js/mail');
const request = require('request');

module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.post('/', (req, res) => {
        let message = req.body.name + "vous a envoyé un message\n";
        message += "Sujet:" + req.body.subject + "\n";
        message += req.body.txtMsg;

        let msg = `<h3>${req.body.name} vous a envoyé un message</h3>
            <h2>Sujet: ${req.body.subject}</h2>
            <p>${req.body.txtMsg}</p>
            </br>
            <p>Voici l'adresse mail du destinataire: ${req.body.email}</p>
        `;
        sendMail("contact@arlex.fr", req.body.subject, msg);
        res.redirect('/');
    })
};