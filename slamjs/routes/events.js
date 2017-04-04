var express = require('express');
var router = express.Router();
var event = require('../models/event');

/* GET events listing. */
router.get('/', function(req, res, next) {
    event.find({}, {}, function(e,docs){
        res.render('events', {"title" : "Liste des évenements", "eventlist": docs 
            });
        });
});
/* Ajout d'un utilisateur, pas GET mais POST cette fois et sur l'URL de la méthode pour le routage */
router.post('/addevent', function(req, res) {
  
    // Récupération des valeurs du formulaire
   var eventNom = req.body.nom;
   var eventType = req.body.type;
   var eventDate = req.body.date;
   var eventPlace = req.body.place;

   // Création de l'objet utilisateur suivant le schéma
   var newEvent = new event({
      "nom" : eventNom,
      "type" : eventType,
      "date": eventDate,
      "place": eventPlace
   });
       
   newEvent.save( function (err,doc) {
      if (err) {
         // Retour d'une erreur
         res.send("Pas glop !");
      }
      else {
         // Redirection vers la liste, donc vers une vue existante
         res.redirect("/events");
      }
   });
});

/*router.get("/delete",function(req,res){
   var id = req.query.id;
   var db = req.db;
   var event = req.db.('events');
    
   event.remove({ id:':id'},function (err){
     if (err) return handleError(err);
                });
    
    
}); */

module.exports = router;