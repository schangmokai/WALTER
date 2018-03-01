
angular.module('starter.controllers', [])



.controller('ConnexionCtrl', function($scope, $state, $http, $ionicLoading, $ionicPopup, heureService, $config) {

   $scope.$config = $config.URI;


   $scope.user = {};

   
   $scope.save = function(user){
     
      heureService.findEnseignantByLoginAndPassword(user)
                  .then(function(donnees){
                      
                      if((donnees.length!=0)&&(donnees[0].login!="zoi@yzoz¨¨^^hsosoè__é_728928292")){
                          //$scope.save(maliste, appel);
                          heureService.setPersonneConnecte(donnees[0]);
                          $state.go("listesclasses");
                      } 
                      else{

                         $ionicPopup.alert({
                            title: 'Success...',
                            template: "Login ou mots de passe incorrect"
                          });  
                         $scope.user = {};
                      }
                  },
                  function(errResponse){
                      $ionicPopup.alert({
                        title: 'Success...',
                        template: "erreur Connexion"
                      });
                      
      });
     
   }
    
})


.controller('NoteCtrl', function($scope, $state, $stateParams, $http, $ionicLoading, $ionicPopup, heureService, $config) {
    $scope.$config = $config.URI;
    
    $scope.courid = $stateParams.id;
    $scope.intitule = $stateParams.intitule;
    $scope.code = $stateParams.code;
    $scope.classe = $stateParams.classe;
    $scope.selection={};
    $scope.sequences = [
        {val:1},
        {val:2},
        {val:3},
        {val:4},
        {val:5},
        {val:6}
    ]

    $scope.listeseleve = function(){
        try{

             $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });         
              var link =  $scope.$config.findEleveByClasee + $scope.classe;
              $http.get(link, {headers:{
                   'Content-Type': 'application/json'
                  },params:{}}).success(function (res){ 
                      
                      $scope.listeseleves = res;

                  $ionicLoading.hide();
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
      }; 

     $scope.listeseleve();

     

     $scope.valider = function(listeseleves){
      
        
       for(i = 0; i < listeseleves.length; i++){
            data = {
              sequence:1,
              valeur:listeseleves[i].note,
              cours:{
                id: $scope.courid,
                code: $scope.code,
                intitule: $scope.intitule
              },
              eleve: listeseleves[i]
           }

           $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });

           heureService.saveNote(data)
                  .then(function(donnees){
                      $ionicLoading.hide();
                  },
                  function(errResponse){
                      console.log("erreur");
                      $ionicLoading.hide();
            });

       }


     }
    
})

.controller('ListescoursCtrl', function($scope, $state, $http, $stateParams, $ionicLoading, heureService, $ionicPopup, $config) {
    
     $scope.$config = $config.URI;

     $scope.listescours = Array();
     $scope.toto = $stateParams.id;
     $scope.code = $stateParams.code;
     $scope.codeclasse = $stateParams.codeclasse;

     
     $scope.appelPourCours = function(cours){
       $scope.intitule = cours.intitule;
       $scope.cours = cours.id;
       $scope.codeCours = cours.code;
       $state.go("admineleve", {id: $scope.toto, intitule: $scope.intitule, cours: $scope.cours, code: $scope.code, codeclasse: $scope.codeclasse, codeCours: $scope.codeCours});
     }

     $scope.listescour = function(){
        try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });     
              var link =  $scope.$config.findCoursByNiveau + $scope.code;
              $http.get(link, {headers:{
                   'Content-Type': 'application/json'
                  },params:{}}).success(function (res){ 
                      $scope.listescours = res;
                  $ionicLoading.hide();
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              $ionicPopup.alert({
                title: 'Success...',
                template: "erreur Connexion"
              });
            }
      }; 
    
    $scope.listescour();

})


.controller('ListeseleveCtrl', function($scope, $state, $http, $stateParams, $ionicLoading, $ionicPopover, $ionicModal, heureService, $ionicPopup, $config) {
    

    $scope.$config = $config.URI;



     $scope.data = {};

     $scope.listeseleves = Array();
     $scope.toto = $stateParams.id;
     $scope.intitule = $stateParams.intitule;
     $scope.cours = $stateParams.cours;
     $scope.code = $stateParams.code;
     $scope.codeclasse = $stateParams.codeclasse;
     $scope.codeCours = $stateParams.codeCours;
     $scope.appel={};

     
     $scope.heures = {};
    
        $scope.AllHeure = function (){
          heureService.getHeures()
                  .then(function(donnees){
                     
                      $scope.heures = donnees;
                   },
                  function(errResponse){
                      console.log("erreur");
                  });
          };
          
        $scope.AllHeure(); 






    var template = '<ion-popover-view> <ion-content> <div class="list"><div><a class="item item-thumbnail-left button" ng-click="publierNote()"> <p> publier les notes </p></a></div> <div><a class="item item-thumbnail-left button" ng-click="publierVersements()"> <p> publier les versements </p></a></div><div><a class="item item-thumbnail-left button" ng-click="reuniongenerale()"><p> reuinion générale </p></a></div><div><a class="item item-thumbnail-left button" ng-click="AvisAuxParents()"><p> avis a tous les parents </p></a></div><div><a class="item item-thumbnail-left button" ng-click="note()"> <p> Enregistrer note </p></a><a class="item item-thumbnail-left button" ng-click="mafonction()"> <p> publier les bulletins </p></a></div><div><a class="item item-thumbnail-left button" ng-click="mafonction()"> <p> paramètre </p></a></div></div> </ion-content></ion-popover-view>';

     
    
    $scope.AvisAuxParents = function(){
        $scope.closePopover();
        $state.go("avisauxparent");

     }

      $scope.reuniongenerale = function(){
        $scope.closePopover();
        $state.go("reuinionsgenerale");
     }


  
      $scope.note = function(){
        $scope.closePopover();
        $state.go("note",{id:$scope.cours,code:$scope.codeCours, intitule:$scope.intitule, classe:$scope.codeclasse});
      }


    $scope.publierNote = function() {
      try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });        
              var link = $scope.$config.publiernotes;
              $http.get(link, {headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                     var note = res[i].valeur;
                     var eleveNom = res[i].eleve.nom;
                     var elevePrenom = res[i].eleve.prenom;
                     var parentNom = res[i].eleve.parents.nom;
                     var parentprenom = res[i].eleve.parents.prenom;
                     var numeroparent = res[i].eleve.parents.numeroTelephone;
                     var matiere = res[i].cours.intitule;
                     
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + parentNom + " " + parentprenom + "\n"+ "Nous tenons a vous informer que votre fils/fille : " +  eleveNom + " " +  elevePrenom + "\n" + " à décroché " + note + " en " + matiere + " Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 }


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Note publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
    };
   

     $scope.publierVersements = function() {
        try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.publierversements;
              $http.get(link, {headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                     var montant = res[i].montant;
                     var eleveNom = res[i].eleve.nom;
                     var elevePrenom = res[i].eleve.prenom;
                     var parentNom = res[i].eleve.parents.nom;
                     var parentprenom = res[i].eleve.parents.prenom;
                     var numeroparent = res[i].eleve.parents.numeroTelephone;
                     var tranche = res[i].tranche;
                     
                     
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + parentNom + " " + parentprenom + "\n"+ "Nous tenons a vous informer du receptionnement de la somme de : " +  montant + " FCFA " + "\n" + " pour la  " + tranche + " tranche des frais de scolarité de votre Fils/Fille " + eleveNom + " " + elevePrenom +" Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 } 


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Success de la publication"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }

    };




    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    
    $scope.openPopover = function($event) {
      
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-down'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });



    
     
     $scope.listeseleve = function(){
        try{

             $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });         
              var link =  $scope.$config.findEleveByClasee + $scope.codeclasse;
              $http.get(link, {headers:{
                   'Content-Type': 'application/json'
                  },params:{}}).success(function (res){ 
                      
                      $scope.listeseleves = res;

                  $ionicLoading.hide();
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
      }; 




   $scope.verifieabsence = function (maliste, appel){

            if(appel.debut.debut>=appel.fin.debut){

                $ionicPopup.alert({
                  title: 'Success...',
                  template: "Movais choix des l'heures"
                });
            }else{

                heureService.findProgramme(appel, $scope.codeclasse)
                    .then(function(donnees){
                      
                        if(donnees.length!=0){
                            $scope.save(maliste, appel);
                            $ionicPopup.alert({
                              title: 'Success...',
                              template: "SUCCESS d'enregistrement et \n de notification des parents"
                            });
                        } 
                        else{

                            $ionicPopup.alert({
                              title: 'Success...',
                              template: "Vous etes pas programmé Monsieur"
                            });
                        }
                    },
                    function(errResponse){
                        console.log("erreur");
              });
            }  
              
    }



    $scope.save = function(maliste, appel){
        var nomEleve = "";
        var prenomEleve = ""; 
        

        for (var i = 0; (i < maliste.length) ; i++) {

              var appele = {};
              
              if(maliste[i].status==true){

                 omEleve = maliste[i].nom;

                 prenomEleve = maliste[i].prenom;
 
                 appele.debut = appel.debut;
                 appele.fin = appel.fin;
                 appele.eleve = maliste[i];
                 appele.cours = {
                       "id": $scope.cours,
                       "code": $scope.codeCours,
                       "intitule": $scope.intitule
                 };



                 heureService.addAppel(appele)
                  .then(function(donnees){
                    
                     
                      },
                      function(errResponse){
                          console.log("erreur");
                });

                try{
                      
                                  var numeroparent = maliste[i].parents.numeroTelephone;
                                 // plugin pour l'envois des sms
                                  //  cordova plugin add https://github.com/cordova-sms/cordova-sms-plugin.git
                              

                                  var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + maliste[i].parents.nom + " " + maliste[i].parents.prenom + "\n"+ "Nous tenons a vous informer l'absence de votre fils/fille : " +  nomEleve + " " +  prenomEleve + "\n" + " au cours de " + $scope.intitule + " de " + appel.debut.debut +" h " + appel.debut.fin + " min " + " à " + appel.fin.debut +" h " + appel.fin.fin + " min " +" Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 }
                               $scope.cmp = 1;
                         
                          
                        }catch(r){
                          alert("yes il a echoue")
                          alert(r);
                        }

                        
                   }
                
              };
          }

    $scope.listeseleve();

})

.controller('etatseleveCtrl', function($scope, $state, $http, $stateParams, $ionicModal, $ionicLoading, $ionicPopup, $ionicPopover, heureService, $config) {
    
     $scope.$config = $config.URI;

     $scope.eleve;
     $scope.data = {};
     $scope.listeseleves = Array();
     $scope.toto = $stateParams.id;
     $scope.code = $stateParams.code;
     $scope.intitule = $stateParams.intitule;
     $scope.cours = $stateParams.cours;
     $scope.codeclasse = $stateParams.codeclasse;
     $scope.inscriptions = {};

   

    $scope.etats = function(){
            alert($scope.code);
     }



    $scope.recherche = function(codebare){
              $ionicLoading.show({
                  content: 'Loading...',
                  showBackdrop: false
              });

              heureService.getInscriptionByClasseCode($scope.codeclasse).then(function (response) {
                           
                           $scope.inscriptions = response;
                        
                   },function (errResponse) {
                     console.log('Error while fetching Currencies');
                     $ionicLoading.hide();
                  }
              );
         }


     $scope.recherche();

     $scope.appelPourCours = function(){
       $state.go("listeseleves", {id: $scope.toto, intitule: $scope.intitule, cours: $scope.cours, code: $scope.code, codeclasse: $scope.codeclasse});
     }


    var template = '<ion-popover-view> <ion-content> <div class="list"><div><a class="item item-thumbnail-left button" ng-click="publierNote()"> <p> publier les notes </p></a></div> <div><a class="item item-thumbnail-left button" ng-click="publierVersements()"> <p> publier les versements </p></a></div><div><a class="item item-thumbnail-left button" ng-click="reuniongenerale()"><p> reuinion générale </p></a></div><div><a class="item item-thumbnail-left button" ng-click="AvisAuxParents()"><p> avis a tous les parents </p></a></div><div><a class="item item-thumbnail-left button" ng-click="mafonction()"> <p> publier les bulletins </p></a></div><div><a class="item item-thumbnail-left button" ng-click="mafonction()"> <p> paramètre </p></a></div></div> </ion-content></ion-popover-view>';

   


     $scope.AvisAuxParents = function(){
        $scope.closePopover();
        $state.go("avisauxparent");

     }

      $scope.reuniongenerale = function(){
        $scope.closePopover();
        $state.go("reuinionsgenerale");
     }


    $scope.ValiderReunion = function(data){
       try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });        
              var link = $scope.$config.listeparents;
              $http.get(link, {headers:{ 
                    "Content-Type":"application/json"
                  },params:{}}).success(function (res){  

                  for(i = 0; i < res.length; i++){

                                   
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + res[i].nom + " " + res[i].prenom + "\n"+ "Nous tenons a vous informer qu'une importante Reuinion se tiendra au "+ data.ecole + "le " + data.date + " à " + data.heure + " precise l'ordre du jours vous sera communiqué " + "\n" + " LE PROVISEUR";
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(res[i].numeroTelephone, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 }


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Reuinion publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
        
    }

    
    $scope.ValiderLavis = function(data) {

       try{
             
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.listeparents;
              $http.get(link, {headers:{
                    "Content-Type":"application/json",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + res[i].nom + " " + res[i].prenom + "\n"+ "Nous tenons a vous informer que la date limite de payement des frais d'inscription au "+ data.ecole + "est fixé pour la date du " + data.date + " à " + data.heure + " precise l'ordre du jours vous sera communiqué " + "\n" + " LE PROVISEUR";
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(res[i].numeroTelephone, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 }


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Avis publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
    };


    $scope.publierNote = function() {
      try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });       
              var link = $scope.$config.publiernotes;
              $http.get(link, {headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                     var note = res[i].valeur;
                     var eleveNom = res[i].eleve.nom;
                     var elevePrenom = res[i].eleve.prenom;
                     var parentNom = res[i].eleve.parents.nom;
                     var parentprenom = res[i].eleve.parents.prenom;
                     var numeroparent = res[i].eleve.parents.numeroTelephone;
                     var matiere = res[i].cours.intitule;
                     
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + parentNom + " " + parentprenom + "\n"+ "Nous tenons a vous informer que votre fils/fille : " +  eleveNom + " " +  elevePrenom + "\n" + " à décroché " + note + " en " + matiere + " Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 } 


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Note publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
    };


    $scope.publierVersements = function() {
             try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.publierversements;
              $http.get(link, {headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                     var montant = res[i].montant;
                     var eleveNom = res[i].eleve.nom;
                     var elevePrenom = res[i].eleve.prenom;
                     var parentNom = res[i].eleve.parents.nom;
                     var parentprenom = res[i].eleve.parents.prenom;
                     var numeroparent = res[i].eleve.parents.numeroTelephone;
                     var tranche = res[i].tranche;
                     
                     
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + parentNom + " " + parentprenom + "\n"+ "Nous tenons a vous informer du receptionnement de la somme de : " +  montant + " FCFA " + "\n" + " pour la  " + tranche + " tranche des frais de scolarité de votre Fils/Fille " + eleveNom + " " + elevePrenom +" Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 } 


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Success de la publication"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }

    };
    
     
   
    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-down'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

   


    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

   

    // Execute action on hide modal
    $scope.$on('modal2.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal2.removed', function() {
      // Execute action
    });

   

     $scope.sendSMS = function(data){

            $scope.closeModal();
            $scope.numeroparent;
            data.enseignant = heureService.getPersonneConnecte();
            data.eleve = $scope.eleve;

            

            heureService.saveNotification(data)
                  .then(function(donnees){
                    
                      if(donnees.length!=0){
                          //$scope.save(maliste, appel);
                          $ionicPopup.alert({
                            title: 'Success...',
                            template: "SUCCESS d'enregistrement et \n de notification des parents"
                          });
                      } 
                      else{

                          $ionicPopup.alert({
                            title: 'Success...',
                            template: "Vous etes pas programmé Monsieur"
                          });
                      }
                  },
                  function(errResponse){
                      console.log("erreur");
            });



             try{

                      var options = {
                            replaceLineBreaks: false, // true to replace \n by a new line, false by default
                            android: {
                               // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                intent: '' // send SMS without open any other app
                            }
                        };

                     try{
                          var message = "Nom de l'eleve : " + $scope.eleve.nom + " " + $scope.eleve.prenom + "\n" + "Objet : " + data.objet + "\n" + "Type : " + data.type + "\n" + "Contenu : " + data.contenu ;
                          document.addEventListener("deviceready", function () {
                          var success = function () { 
                            $ionicPopup.alert({
                              title: 'Success...',
                              template: "Message envoyé avec success"
                              });

                          };
                          var error = function (e) { 
                              $ionicPopup.alert({
                              title: 'error...',
                              template: 'Message Failed:' + e
                              });
                           
                          };
                          // obbjet ici es consideré comme le numero pour les test
                          sms.send($scope.eleve.parents.numeroTelephone, message , options, success, error); 
                       });
                     }catch(r){
                      alert(r);
                     }

            }catch(r){
              alert(r);
            }
            
    }

     
    $scope.blame = function(eleve) {
      $scope.eleve = eleve;
      $scope.openModal();
    }

     $scope.listeseleve = function(){
        try{

              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              }); 
              var link =  $scope.$config.findEleveByClasee + $scope.codeclasse;
              $http.get(link, {headers:{
                    'Content-Type': 'application/json'
                  },params:{}}).success(function (res){ 
                      $scope.listeseleves = res;
                      
                     
                  $ionicLoading.hide();
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
      }; 
    
    $scope.listeseleve();

})






.controller('admineleveCtrl', function($scope, $state, $http, $stateParams, $ionicModal, $ionicLoading, $ionicPopup, $ionicPopover, heureService, $config) {
   
     $scope.$config = $config.URI;


     $scope.eleve;
     $scope.data = {};
     $scope.listeseleves = Array();
     $scope.toto = $stateParams.id;
     $scope.code = $stateParams.code;
     $scope.intitule = $stateParams.intitule;
     $scope.cours = $stateParams.cours;
     $scope.codeclasse = $stateParams.codeclasse;
     $scope.codeCours = $stateParams.codeCours;



    $scope.etats = function(){
       $state.go("etatseleves", {id: $scope.toto, intitule: $scope.intitule, cours: $scope.cours, code: $scope.code, codeclasse: $scope.codeclasse});
    }




     $scope.appelPourCours = function(){
       $state.go("listeseleves", {id: $scope.toto, intitule: $scope.intitule, cours: $scope.cours, code: $scope.code, codeclasse: $scope.codeclasse, codeCours: $scope.codeCours});
     }


    var template = '<ion-popover-view> <ion-content> <div class="list"><div><a class="item item-thumbnail-left button" ng-click="publierNote()"> <p> publier les notes </p></a></div>  <div><a class="item item-thumbnail-left button" ng-click="publierVersements()"> <p> publier les versements </p></a></div><div><a class="item item-thumbnail-left button" ng-click="reuniongenerale()"><p> reuinion générale </p></a></div><div><a class="item item-thumbnail-left button" ng-click="AvisAuxParents()"><p> avis a tous les parents </p></a></div><div><a class="item item-thumbnail-left button" ng-click="mafonction()"> <p> publier les bulletins </p></a></div><div><a class="item item-thumbnail-left button" ng-click="mafonction()"> <p> paramètre </p></a></div></div> </ion-content></ion-popover-view>';

   


     $scope.AvisAuxParents = function(){
        $scope.closePopover();
        $state.go("avisauxparent");

     }

      $scope.reuniongenerale = function(){
        $scope.closePopover();
        $state.go("reuinionsgenerale");
     }


    $scope.ValiderReunion = function(data){
       try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });         
              var link = $scope.$config.listeparents;
              $http.get(link, {headers:{ 
                    "Content-Type":"application/json"
                  },params:{}}).success(function (res){  

                  for(i = 0; i < res.length; i++){

                                   
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + res[i].nom + " " + res[i].prenom + "\n"+ "Nous tenons a vous informer qu'une importante Reuinion se tiendra au "+ data.ecole + "le " + data.date + " à " + data.heure + " precise l'ordre du jours vous sera communiqué " + "\n" + " LE PROVISEUR";
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(res[i].numeroTelephone, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 }


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Reuinion publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
        
    }

    
    $scope.ValiderLavis = function(data) {

       try{
             
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.listeparentss;
              $http.get(link, {headers:{
                    "Content-Type":"application/json",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + res[i].nom + " " + res[i].prenom + "\n"+ "Nous tenons a vous informer que la date limite de payement des frais d'inscription au "+ data.ecole + "est fixé pour la date du " + data.date + " à " + data.heure + " precise l'ordre du jours vous sera communiqué " + "\n" + " LE PROVISEUR";
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(res[i].numeroTelephone, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 }


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Avis publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
    };


    $scope.publierNote = function() {
      try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.publiernotes;
              $http.get(link, {headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                     var note = res[i].valeur;
                     var eleveNom = res[i].eleve.nom;
                     var elevePrenom = res[i].eleve.prenom;
                     var parentNom = res[i].eleve.parents.nom;
                     var parentprenom = res[i].eleve.parents.prenom;
                     var numeroparent = res[i].eleve.parents.numeroTelephone;
                     var matiere = res[i].cours.intitule;
                     
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + parentNom + " " + parentprenom + "\n"+ "Nous tenons a vous informer que votre fils/fille : " +  eleveNom + " " +  elevePrenom + "\n" + " à décroché " + note + " en " + matiere + " Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 } 


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Note publier avec success"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
    };


    $scope.publierVersements = function() {
       try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.publierversements;
              $http.get(link, {headers:{
                    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
                  },params:{}}).success(function (res){ 
                  
                  for(i = 0; i < res.length; i++){
                     var montant = res[i].montant;
                     var eleveNom = res[i].eleve.nom;
                     var elevePrenom = res[i].eleve.prenom;
                     var parentNom = res[i].eleve.parents.nom;
                     var parentprenom = res[i].eleve.parents.prenom;
                     var numeroparent = res[i].eleve.parents.numeroTelephone;
                     var tranche = res[i].tranche;
                     
                     
                                   var options = {
                                        replaceLineBreaks: false, // true to replace \n by a new line, false by default
                                        android: {
                                           // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                            intent: '' // send SMS without open any other app
                                        }
                                    };

                                   try{
                                        
                                      var message = "Bsr Mr/mme : " + parentNom + " " + parentprenom + "\n"+ "Nous tenons a vous informer du receptionnement de la somme de : " +  montant + " FCFA " + "\n" + " pour la  " + tranche + " tranche des frais de scolarité de votre Fils/Fille " + eleveNom + " " + elevePrenom +" Merci " ;
                                      document.addEventListener("deviceready", function () {
                                      var success = function () { 
                                        //success
                                      };
                                      var error = function (e) { 
                                         //error
                                       
                                      };
                                      // obbjet ici es consideré comme le numero pour les test
                                      sms.send(numeroparent, message , options, success, error); 
                                   });

                                 }catch(r){
                                  alert(r);
                                 } 


                  }

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Success...',
                    template: "Success de la publication"
                  });
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }

            
    };
    
     
   
    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };

    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-down'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

   


    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

   

    // Execute action on hide modal
    $scope.$on('modal2.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal2.removed', function() {
      // Execute action
    });

   

     $scope.sendSMS = function(data){

            $scope.closeModal();
            $scope.numeroparent;
            data.enseignant = heureService.getPersonneConnecte();
            data.eleve = $scope.eleve;

            

            heureService.saveNotification(data)
                  .then(function(donnees){
                    
                      if(donnees.length!=0){
                          //$scope.save(maliste, appel);
                          $ionicPopup.alert({
                            title: 'Success...',
                            template: "SUCCESS d'enregistrement et \n de notification des parents"
                          });
                      } 
                      else{

                          $ionicPopup.alert({
                            title: 'Success...',
                            template: "Vous etes pas programmé Monsieur"
                          });
                      }
                  },
                  function(errResponse){
                      console.log("erreur");
            });



             try{

                      var options = {
                            replaceLineBreaks: false, // true to replace \n by a new line, false by default
                            android: {
                               // intent: 'INTENT'  // send SMS with the native android SMS messaging
                                intent: '' // send SMS without open any other app
                            }
                        };

                     try{
                          var message = "Nom de l'eleve : " + $scope.eleve.nom + " " + $scope.eleve.prenom + "\n" + "Objet : " + data.objet + "\n" + "Type : " + data.type + "\n" + "Contenu : " + data.contenu ;
                          document.addEventListener("deviceready", function () {
                          var success = function () { 
                            $ionicPopup.alert({
                              title: 'Success...',
                              template: "Message envoyé avec success"
                              });

                          };
                          var error = function (e) { 
                              $ionicPopup.alert({
                              title: 'error...',
                              template: 'Message Failed:' + e
                              });
                           
                          };
                          // obbjet ici es consideré comme le numero pour les test
                          sms.send($scope.eleve.parents.numeroTelephone, message , options, success, error); 
                       });
                     }catch(r){
                      alert(r);
                     }

            }catch(r){
              alert(r);
            }
            
    }

     
    $scope.blame = function(eleve) {
      $scope.eleve = eleve;
      $scope.openModal();
    }

     $scope.listeseleve = function(){
        try{

              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              
              var link = $scope.$config.findEleveByClasee + $scope.codeclasse;
              $http.get(link, {headers:{
                    'Content-Type': 'application/json'
                  },params:{}}).success(function (res){ 
                      $scope.listeseleves = res;
                      console.log(res);
                     
                  $ionicLoading.hide();
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
      }; 
    
    $scope.listeseleve();

})








.controller('ListesclassesCtrl', function($scope, $http, $state, $ionicLoading, heureService, $ionicPopup, $config) {
    


    $scope.$config = $config.URI;


    $scope.listeclasses = Array();

     var personne = {};

     $scope.inscription = {};

     personne = heureService.getPersonneConnecte();

    



  $scope.findByCodeBarre = function(){
        
         // $scope.recherche("zozo116popoe");

          cordova.plugins.barcodeScanner.scan(
              function (result) {
                 //$scope.result = result.text;
                 $scope.result = 'OIUZYZ562';
                  /*alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);*/

                         $scope.recherche(result.text);
              },
              function (error) {
                  alert("Scanning failed: " + error);
              },
              {
                  "showFlipCameraButton" : true, // iOS and Android
                  "preferFrontCamera" : false, // iOS and Android
                  "prompt" : "Place a barcode inside the scan area", // supported on Android only
                 // "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                  "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
              }
           );

        }


        
        $scope.recherche = function(codebare){
              $ionicLoading.show({
                  content: 'Loading...',
                  showBackdrop: false
              });

              heureService.getInscriptionByCode(codebare).then(function (response) {
                           
                           $scope.inscription = response[0];
                           $ionicLoading.hide();
                           if((response.length==1)&&($scope.inscription.status/$scope.inscription.nombredetranche!=1)){
                              /* $ionicPopup.alert({
                                title: 'Rapport de Solvabilité',
                                template: "C'est élève " + $scope.inscription.eleve.nom  +" "+ $scope.inscription.eleve.prenom +"\n est à "+  $scope.inscription.status +"/" + $scope.inscription.nombredetranche + " tranche de versement donc :" + "\n il n'est pas completement Solvable" 
                              });*/

                              $ionicPopup.show({
                                template: '<center><img src="http://localhost/SuivieElevePhotos/img/'+$scope.inscription.eleve.image+'"><center>',
                                title: 'Rapport de Solvabilité',
                                subTitle: 'Elève : ' + $scope.inscription.eleve.nom  +' '+ $scope.inscription.eleve.prenom +'\n est à '+  $scope.inscription.status +' / ' + $scope.inscription.nombredetranche + ' tranche de versement donc :'  + '\n il est pas completement Solvable',
                                scope: $scope,
                                buttons: [
                                  { text: 'Cancel' },
                                  {
                                    text: '<b>OK</b>',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                      

                                    }
                                  }
                                ]
                              });
                           }
                           if((response.length==1)&&($scope.inscription.status/$scope.inscription.nombredetranche==1)){
                              /* $ionicPopup.alert({
                                title: 'Rapport de Solvabilité',
                                template: "c'est élève est completement Solvable "
                              });*/
                                $ionicPopup.show({
                                template: '<center><img src="http://localhost/SuivieElevePhotos/img/'+$scope.inscription.eleve.image+'"><center>',
                                title: 'Rapport de Solvabilité',
                                subTitle: 'élève : ' + $scope.inscription.eleve.nom  +' '+ $scope.inscription.eleve.prenom + ' \n est completement Solvable',
                                scope: $scope,
                                buttons: [
                                  { text: 'Cancel' },
                                  {
                                    text: '<b>OK</b>',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                      

                                    }
                                  }
                                ]
                              });
                           }
                           if(response.length==0){
                              $ionicPopup.alert({
                                title: 'Rapport de Solvabilité',
                                template: "c'est élève n'est meme pas incrit "
                              });

                              /*$ionicPopup.show({
                                template: '<center><img src="http://localhost/SuivieElevePhotos/img/'+$scope.inscription.eleve.image+'"><center>',
                                title: 'Rapport de Solvabilité',
                                subTitle: 'élève non solvable',
                                scope: $scope,
                                buttons: [
                                  { text: 'Cancel' },
                                  {
                                    text: '<b>OK</b>',
                                    type: 'button-positive',
                                    onTap: function(e) {
                                      

                                    }
                                  }
                                ]
                              });*/
                              
                           }
                   },function (errResponse) {
                     console.log('Error while fetching Currencies');
                     $ionicLoading.hide();
                  }
              );
         }



    $scope.toto = function(classe){
       $state.go("listescours", {"id": classe.id, "code": classe.niveau.code, "codeclasse": classe.code})

    }

    $scope.listesclasse = function(){
        try{
              $ionicLoading.show({
                content: 'Loading...',
                showBackdrop: false
              });
              var link = $scope.$config.listeclasses;
              $http.get(link, {headers:{ 
                       'Content-Type': 'application/json'
                  },params:{}}).success(function (res){ 
                      $scope.listeclasses = res;
                  $ionicLoading.hide();
              }).error(function(response){
                 alert("mokai");
                 alert(response);
                 $ionicLoading.hide();
              });
            }catch(r){
              alert(r);
            }
      }; 

    $scope.listesclasse();

});


