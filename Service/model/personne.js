/**
 * Created by Massil on 25/01/2017.
 */
var db = require('./../config/db');

var Schema = db.Schema;

var personne = Schema({
    nom : 'String',
    prenom : 'String' ,
    email : 'String',
    patientMedecin : 'String',
    fiches : [{type : Schema.Types.ObjectId , ref : 'FicheMedical'}]
});

module.exports = db.model('Personne' , personne);