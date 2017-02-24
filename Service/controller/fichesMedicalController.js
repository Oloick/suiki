/**
 * Created by Massil on 01/02/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');

var FicheMedical = require('./../model/suiki/ficheMedical');
var Patient = require('./../model/suiki/patient');
var Exercice = require('./../model/suiki/exercice');
var Pathologie = require('./../model/suiki/pathologie');
var Symptome = require('./../model/suiki/symptome');
var Phase = require('./../model/suiki/phase');
var Personne = require('./../model/suiki/personne');

router.use(bodyParser.json());

router.post("/" , function(req , res){
    var profile = req.body.profile;
    /*var fiche = req.body.fiche;
    var exercices = req.body.exercices;
    var pathologie = req.body.pathologie;
    var symptomes = req.body.symptomes;
    var phase = req.body.phase;*/

    getPatient(profile);
    res.end();

});

router.put('/' , function (req , res) {
    inscrireFiche(req, res);
})

var inscrireFiche = function(req , res)
{
    //console.log(req.body);
    var nom_pathologie = req.body.pathologie.nom;
    var  description_pathologie = req.body.pathologie.description;

    // pour avoir un tableau de symptome.
    var all_symptome = req.body.symptomes;

    var nom_phase = req.body.phase.nom;
    var  description_phase = req.body.phase.description;

    var all_exercice = req.body.exercices;

    var fiche = FicheMedical ();


    addPathologie(nom_pathologie , description_pathologie, fiche, req , res);
    addSymptome(all_symptome, fiche, req, res);
    addPhase(nom_phase, description_phase, fiche, req, res);
    addExercice(all_exercice, fiche, req, res);
};

var addPathologie = function(nom, description, fiche, req, res){
    Pathologie
        .find({
            nom : nom,
            description : description })
        .exec(function(err, pathologieData){
            console.log("Pathologie data: " + pathologieData);
            fiche.pathologie = pathologieData;
            res.end();
        });
};

var addSymptome = function(all_symptome, fiche, req, res){
    getSymptomes(all_symptome, fiche);
};

var addPhase = function(nom, description, fiche, req, res){
    Phase
        .find({
            nom : nom,
            description : description })
        .exec(function(err, phaseData){
            console.log("Phase data: " + phaseData);
            fiche.phase = phaseData;
        });
};

var addExercice = function(all_exercice, fiche, req, res){
    getExercices(all_exercice, fiche);
};



/**
 * Fonction permettant de retourner l'id de la phase courante du patient
 * @param phase La phase
 * @returns L'identifiant de la phase
 */

//Not Use
var getPhaseId = function(phase)
{
    var id = null;
    Phase
        .findOne({nom : phase.nom , description : phase.description} , function (err , phase) {
            id = phase._id;
        });
    return id;
};

var getExercices = function(exercices, fiche)
{
    exercices.forEach(function(exercice){
        Exercice
            .find({nom : exercice.nom , description:exercice.description}
            ,function(err , data){
                fiche.exercice = data;
                console.log("Exercices data : " + data);
                });
    });
};

//Not Use
var getPathologieId = function(pathologie){
    var pathologieId = null;
    Pathologie
        .find({nom : pathologie.nom})
        .exec(function(err , data){
            pathologieId = data._id;
        });
    return pathologieId;
};

var getSymptomes = function(symptomes, fiche)
{
    symptomes.forEach(function (element) {
        Symptome.find({nom : element.nom}
            , function (err , data) {
                fiche.symptome = data;
                console.log("Symptomes data : " + data);
            });
    });
};

var createFicheMedical = function(profile)
{

}

var getPatient = function(profile)
{
    var patientF = null;
    Personne.
        findOne({
            nom : profile.nom,
            prenom : profile.prenom,
            email : profile.email
        })
        .exec(function (err , personne) {
            console.log(personne);
            Patient
                .findOne({
                    personne : personne._id
                })
                .populate('personne')
                .exec(function (err , patient) {
                    console.log(patient);
                    patientF = patient;
                });
        });
    return patientF;
};

var ajouterFicherMedical = function(profile , pathologie , symptome , phase , exercice)
{
    var profile ;
}




module.exports = router;