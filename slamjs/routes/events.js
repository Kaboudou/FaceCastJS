var express = require('express');
var router = express.Router();
var event = require('../models/event');
var roles = require('../models/roles');
var demande = require('../models/demande');
var offreRoles = require('../models/offreRoles');



/* GET events listing. */
router.get('/', function(req, res, next) {
    event.find({}, {}, function(e,docs){
        res.render('events', {"title" : "Liste des évenements", "eventlist": docs 
            });
        });
});

router.get('/:id', function(req, res, next){
    var id =req.params.id;
    
    event.findOne({"_id": id},{},function(e,eventDocs){
        roles.find({},{},function(e,roleDocs){
            offreRoles.find({"_event" : id},{}, function(e,offreDocs){
                var arrayIdOffre =[];
                for(var i = 0; offreDocs.length > i; i++){
                    arrayIdOffre.push(offreDocs[i]._id);
            }
                
                demande.find({"_offre": { $in: arrayIdOffre  }}, {}, function(e,demandeDocs){
                    res.render('event',{
                        "title" : "Evénement",
                        "eventlist" : eventDocs,
                        "roleslist" :roleDocs,
                        "offrelist" : offreDocs,
                        "demandelist" : demandeDocs
                })
                            }).populate('_event')
                                .populate('_figurant')
                                .populate('_offre').populate({path: '_offre', populate: {path:'_role', model: 'role'}});
                            }).populate('_role');
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

router.post('/:id/role/add', function(req,res){
    id = req.params.id;
    
    var roleId = req.body.roleId;
    var place = req.body.place;
    
    var newOffreRoles = new offreRoles({
        "_event" : id,
        "_role" : roleId,
        "place" : place
    });
    
    newOffreRoles.save( function (err, doc) {
        if (err) {
            res.send("Pas d'event !");
        }
        else {
            res.redirect("/events/"+id);
            
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
    offreRoles.find({"_event" : id},{}, function(e,offreDocs){
        var arrayIdOffre = [];
        for(var i = 0; offreDocs.length >i; i++){
            arrayIdOffre.push(offreDocs[i]._id);
        }
        
    
    event.findByIdAndRemove({"_id": id },
      function(err){ 
        demande.remove({"_offre": {$in: arrayIdOffre}}, function (err){
            offreRoles.remove({"_event": id}, function (err){
    
            
        if(err) res.json(err);
        else   res.redirect('/events');
                                         });
                                         });
        
    });
});
}); 

module.exports = router;