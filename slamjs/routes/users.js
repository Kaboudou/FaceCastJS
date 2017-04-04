var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* Liste des utilisateurs */
router.get('/', function(req, res, next) {
 user.find({},{},function(e,docs){
  res.render('users', {
   "title" : "Liste des utilisateurs",
   "userlist" : docs
  });
 });
});

module.exports = router;
