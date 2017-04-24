var mongoose = require('mongoose');

// Create schema
var figurantSchema  = new mongoose.Schema({
    "nom" : String,
    "dateNaissance" : Date,
    "email" : String
});

module.exports = mongoose.model('figurant',figurantSchema,'figurant');