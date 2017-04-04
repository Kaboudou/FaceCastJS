var express = require('express');
var router = express.Router();
var figurant = require('../models/figurant');

/* GET users listing. */
router.get('/', function(req, res, next) {
    figurant.find({}, {}, function(e,docs){
        res.render('figurant', {"title" : "Liste des figurants", "figurantlist": docs 
            });
        });
});
/* Ajout d'un utilisateur, pas GET mais POST cette fois et sur l'URL de la méthode pour le routage */
router.post('/addfig', function(req, res) {
  
    // Récupération des valeurs du formulaire
   var figurantNom = req.body.nom;
   var figurantDate = req.body.date;
   var figurantDemande = req.body.demande;

   // Création de l'objet utilisateur suivant le schéma
   var newFigurant = new figurant({
      "nom" : figurantNom,
      "date" : figurantDate,
      "demande": figurantDemande,
   });
       
   newFigurant.save( function (err,doc) {
      if (err) {
         // Retour d'une erreur
         res.send("Pas glop !");
      }
      else {
         // Redirection vers la liste, donc vers une vue existante
         res.redirect("/figurant");
      }
   });
});

module.exports = router;