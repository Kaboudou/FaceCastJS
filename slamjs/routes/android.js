var express = require('express');
var router = express.Router();
var user = require('../models/user');
var figurant = require('../models/figurant');
var event = require('../models/event');

/* Liste des utilisateurs par JSon */
router.get('/', function(req, res, next) {
  var response = {};
 
  user.find({},function(err,data){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {data};
    }

   res.json(response);
  });
});

/* Liste des figurants par JSon */
router.get('/figurant', function(req, res, next) {
  var response = {};
 
 figurant.find({},function(err,data){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {data};
    }

   res.json(response);
  });
});

/* Liste des events par JSon */
router.get('/event', function(req, res, next) {
  var response = {};
 
  event.find({},function(err,data){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {data};
    }

   res.json(response);
  });
});

module.exports = router;
