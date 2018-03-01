angular.module('starter.constant', [])

.constant('$config', {
      URI:{
        image: "http://localhost/Follow_Pupil/SuivieElevePhotos/img/",
        qrcode:"http://localhost/Follow_Pupil/SuivieEleveQRcode/",
        listeclasses: "http://localhost:8080/SuiviEleve/classes/listes",
        publiernotes: "http://localhost:8080/SuiviEleve/notes/publier",
        publierversements: "http://localhost:8080/SuiviEleve/versements/publierversements",
        findEleveByClasee: "http://localhost:8080/SuiviEleve/eleves/findEleveByClasee/",
        listeparents: "http://localhost:8080/SuiviEleve/parents/listes",
        findCoursByNiveau:"http://localhost:8080/SuiviEleve/courss/findCoursByNiveau/",
        recherche:"http://localhost:8080/SuiviEleve/programmations/recherche/",
        findprogrammebyclasse:"http://localhost:8080/SuiviEleve/programmations/findProgramme/",
        savenotification:"http://localhost:8080/SuiviEleve/notificationss/saveNotification",
        findbycodebarre: "http://localhost:8080/SuiviEleve/inscriptions/code/",
        findbyclassebycode: "http://localhost:8080/SuiviEleve/inscriptions/classe/",
        listesByLoginAndPassword:"http://localhost:8080/SuiviEleve/enseignants/listesByLoginAndPassword",
        saveAppel:"http://localhost:8080/SuiviEleve/appels/saveAppel",
        savenote: "http://localhost:8080/SuiviEleve/notes/saveNote",
        listesheures:"http://localhost:8080/SuiviEleve/heures/listes",
        ajouterheure: "http://localhost:8080/SuiviEleve/heures",
        updateheure: "http://localhost:8080/SuiviEleve/heures/",
        suprimerheure: "http://localhost:8080/SuiviEleve/heures/suprimer/",
      },
      APITOKEN:"208949FKFP890DKF.O380309UJVKSD3IEOIDFOQSDVJ"
});


 //ip adresse localhost

// $scope.$config = $config;  dans le controlleur


// {{$config.URI.image}} dans la vus

