var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
  res.render('insert', { "title" : "Ajout d'un utilisateur" });
});

/* Ajout d'un utilisateur */
router.post('/adduser', function(req, res) {
    // Récupération des valeurs du formulaire
    var userName = req.body.username;
    var userPassword = req.body.userpassword;

    // Création de l'objet utilisateur suivant le schéma
    var newUser = new user({
        "username" : userName,
        "password" : userPassword
    });

    newUser.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas glop !");
        }
        else {
            // Redirection vers la liste
            res.redirect("/users");
        }
    });
});

module.exports = router;
