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
   var eventAdresse = req.body.adresse;
   var eventPlace = req.body.place;

   // Création de l'objet utilisateur suivant le schéma
   var newEvent = new event({
      "nom" : eventNom,
      "type" : eventType,
      "date": eventDate,
      "adresse" : eventAdresse,
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

router.post("/delete/:id", function(req,res){
    var db = req.db;
    var id = req.params.id;
    
    
       
  /** event.remove({ id:':id'},function (err){
     if (err){ return handleError(err);
     res.send('error'); }
     else {
         res.redirect("/events");
     }
                });*/
    event.findByIdAndRemove({"_id": id },
      function(err,doc){ 
        if(err) res.json(err);
        else   res.redirect('/events');
        
    });
    
}); 

module.exports = router;