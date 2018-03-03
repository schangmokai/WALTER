angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicPlatform, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $state.go('app.connexion');
    
  };
  $scope.acceuil = function() {
    $state.go('app.acceuil');

  };

  $scope.mesobservation = function(){
    $state.go('app.observation');
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $ionicPlatform) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('obstacleCtrl', function($scope, $state, $ionicPlatform) {
   $scope.data = {};
   $scope.valider = function(){
      $state.go('app.etineraire',{'depart': $scope.data.depart, 'arrive': $scope.data.arrive});
   }
})

.controller('ConnexionCtrl', function($scope, $state, $ionicPlatform, $http, $ionicPopup, $ionicLoading, $parcours, $rootScope, SirinDataService, ConnectivityMonitor) {

   $scope.utilisateur= {};
  
  if(ConnectivityMonitor.isOnline()){
     $parcours.removeConnecterIndex(0);
     $parcours.addConnecter(1, 0);
     alert("il est bien connecté");
  }else{
     $parcours.removeConnecterIndex(0);
     $parcours.addConnecter(0, 0);
     alert("pas de connexion");
  }
   
   /*function onSaveSuccess(){
       alert("success");
   }

   $scope.savePays = function(){
       $scope.pays = {};
       $scope.pays.nom_fr = "Cameroun";
       $scope.pays.nom_en = "Cameroon";
       $scope.pays.code_tel = "+237";
       $scope.pays.sigle = "CMR";

      if(!$scope.pays.id){
        SirinDataService.createPays($scope.pays).then(onSaveSuccess)
      } else {
        SirinDataService.updatePays($scope.pays).then(onSaveSuccess)
      }
    }
 
    try{

        $scope.savePays();

     }catch(err){
      alert(err)
     } 
  
    

    $scope.listes = function(){
      SirinDataService.getAllPays(function(data){
            $scope.listePays = data;
      })
    }*/

  
  /*$scope.upload = function(){
    var win = function (r) {
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
    }

    var fail = function (error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
    var fileURL = "../img/ionic.png";
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "images/png";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://siren1.ammco.org/web/images/observations/tof1"), win, fail, options);
  }
 
  try{
      $scope.upload();
    }catch(r){
      alert(r);
   }*/

   var langue = {
      "valeur": 'fr'
   };
   $parcours.setLangue(langue);
   $scope.langue = $parcours.getLangue();

   $scope.login = function(utilisateur){

       var internet = $parcours.getConnecterById(0);
       /*console.log("================================================");
       var mokai = "The M//Tools  loved / any code as I have M//Tools http://le mokai pros!";
       mokai = mokai.replace(/\//g,'$');
       console.log(mokai);
       console.log("================================================");*/

      if(internet == 1){

         try{
            $ionicLoading.show({  
              template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
            });
            var link = 'http://siren1.ammco.org/web/fr/api/connexion/'+ utilisateur.login +'/' + utilisateur.password;
            
            $http.get(link).success(function (res){ 
                    console.log(res);
                    
                    if(res==0){
                      $ionicPopup.alert({
                          title: 'Error...',
                          template: "Login ou password incorect"
                      });
                      $ionicLoading.hide();

                    }else{
                       
                       window.localStorage.setItem("login", utilisateur.login);
                       window.localStorage.setItem("password", utilisateur.password);
                       $parcours.removeUtilisateurIndex(0);
                       $parcours.addUtilisateur(res, 0);
                       $rootScope.userconnecte = $parcours.getUtilisateurById(0);
                       $state.go('app.acceuil');

                       $ionicLoading.hide();
                    }
                   
             }).error(function(response){ 

            });

            }catch(r){
              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
        }

      }else{
        console.log("zero connexion internet");
                 //SirinDataService.getAllUtilisateurs(function(data){
                  SirinDataService.findUtilisateursByLoginAndPassword(utilisateur, function(data){
                      if(data.length!=0){
                        window.localStorage.setItem("login", data[0].username);
                        window.localStorage.setItem("password", data[0].password);
                        $parcours.removeUtilisateurIndex(0);
                        $parcours.addUtilisateur(data[0], 0);
                        $rootScope.userconnecte = $parcours.getUtilisateurById(0);
                        $state.go('app.acceuil');
                        $ionicLoading.hide();
                      }else{
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: "SVP connectez vous à internet pour Synchroniser les données.  Ou alors verifiez vos données de connexion (email et password) au cas ou les données sont déjà Synchronisées Merci !!!"
                        });
                      }
                  }) 
      }
      
       
   }

   $scope.inscription = function(){
        $state.go('inscription');
   }

   $scope.forguetpassword = function(){
       window.open('http://siren1.ammco.org/web/'+$scope.langue.valeur+'/resetting/request', '_blank');
       $state.go('connexion');
   }
     
})

.controller('AcceuilCtrl', function($scope, $cordovaGeolocation, $parcours,$rootScope, $state, SirinDataService, $ionicPlatform, $http, $ionicLoading, $ionicPopup) {
   
       var internet = $parcours.getConnecterById(0);
       

      /*$rootScope.changeLanguage = function (langKey) {
            $translate.use(langKey);
      };*/



       /*var posOptions = {timeout: 10000, enableHighAccuracy: false};
          $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
              var lat  = position.coords.latitude
              var long = position.coords.longitude
              alert(lat)
            }, function(err) {
              // error
              alert("ca nakaakaakal");
       });*/

      /*var optionss = {setTimeout: 10000, enableHighAccuracy:true};
      try{
          
          $cordovaGeolocation.getCurrentPosition(optionss).then(function(position){
            alert("le mokaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
          });

      }catch(err){
        alert(err);
      }*/

         var options = {
                enableHighAccuracy: true,
                timeout: 9000,
                maximumAge: 0
          };

          $scope.listetypeobservation = [];

          $scope.langue = $parcours.getLangue();

          if(internet == 1){
               try{
                      $ionicLoading.show({
                        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                      });
                      var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questions';
                      $http.get(link).success(function (res){  
                              $scope.listequestions = res;
                              $ionicLoading.hide();
                       }).error(function(response){
                         $ionicLoading.hide();
                          $ionicPopup.alert({
                              title: 'Error...',
                              template: "votre opération a  echoué!!"
                          });
                          $state.go('app.acceuil');

                      });

                      }catch(r){
                        
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: " " + r
                        });
                  } 

                  try{
                        $ionicLoading.show({  
                          template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
                        });
                        var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/typeobservations';
                        $http.get(link).success(function (res){  
                                $scope.listetypeobservations = res;
                                $ionicLoading.hide();
                         }).error(function(response){
                            
                             $ionicLoading.hide();
                              $ionicPopup.alert({
                                  title: 'Error...',
                                  template: "votre opération a  echoué!!"
                              });
                              $state.go('app.acceuil');
                        });

                        }catch(r){
                          $ionicLoading.hide();
                          $ionicPopup.alert({
                              title: 'Error...',
                              template: " " + r
                          });
                    }



                }else{

                    console.log("zero connexion");

                    SirinDataService.getAlltypeObservations(function(data){
                          $scope.listetypeobservations = data;
                          console.log(data);
                    })

                    
                    SirinDataService.getAllQuestions(function(data){
                          $scope.listequestions = data;
                    }) 
                  
                }
   


             $scope.groupe = function(typeobservation){
                try{

                      navigator.geolocation.getCurrentPosition(function(position){
                    
                                $ionicPopup.alert({
                                   title: 'Success...',
                                   template: "latitude :" + position.coords.latitude  + " longitude : " + position.coords.longitude
                                });

                              $parcours.removeCoordonneIndex(0);
                              $parcours.addCoordonne(position.coords, 0);
                      
                      },
                      function(error){
                        $ionicPopup.alert({
                            title: 'Ooops...',
                            template: "Could not get location"
                        });
                      }, {});
                    }catch(r){
                      $ionicLoading.hide();
                      $ionicPopup.alert({
                          title: 'Error...',
                          template: " " + r
                      });
                  }

                  var date = new Date();
                  //$parcours.add(typeobservation);
                  $parcours.removeIndex(0);
                  $parcours.addIndex(typeobservation, 0);
                  $state.go('app.groupe');
                  
             }

             $scope.inscription = function(){
                $state.go('inscription');
             }

             function onSaveSuccess(){
               alert("success");
             }


    
})




.controller('InscriptionCtrl', function($scope, $state, SirinDataService, $ionicPlatform, $ionicLoading, $http, $ionicPopup, $rootScope,  $parcours) {
     
     $scope.paysselect;
     $scope.temoininscription = 0;
     $scope.listePays;
     $scope.utilisateur = {};
     
     $scope.langue = $parcours.getLangue();
     $scope.listepays;

       try{

            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
            var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/pays';
            $http.get(link).success(function (res){  
                    $scope.listepays = res; 
                    $ionicLoading.hide();
             }).error(function(response){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: "votre opération a  echoué!!"
                });
                $state.go('app.acceuil');
            });

            }catch(r){

              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
        }

      $scope.listefonctions;

       try{

            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
            var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/fonctions';
            $http.get(link).success(function (res){  
                    $scope.listefonctions = res; 
                    $ionicLoading.hide();
             }).error(function(response){
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');
            });

            }catch(r){
              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
        }

     $scope.groupe = function(){
        $state.go('app.groupe');
     }

     
     $scope.inscrire = function(utilisateur){
           $parcours.addUtilisateur(utilisateur, 0);
           $rootScope.userconnecte = $parcours.getUtilisateurById(0);
           try{

            $ionicLoading.show({  
              template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
            });
            var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/inscription/'+ utilisateur.username +'/' + utilisateur.email + '/' + utilisateur.telephone + '/' + utilisateur.password + '/' + utilisateur.ville + '/' + utilisateur.pays + '/' + utilisateur.fonction;
            
            $http.get(link).success(function (res){ 

                    if(res==0){
                       $ionicPopup.alert({
                          title: 'Error...',
                          template: "votre enregistrement a  echoué!!"
                      });
                      $ionicLoading.hide();
                      $scope.temoininscription = 0;
                      $scope.utilisateur = {};
                    }else{
                       $scope.temoininscription = 1;
                       $ionicLoading.hide();
                    }
                   
             }).error(function(response){

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');
            });

            }catch(r){
              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
           }

          
     }


     $scope.connecte = function(){
       $state.go('app.acceuil');
       $scope.temoininscription = 0;
     }

     $scope.listes = function(){
      SirinDataService.getAllPays(function(data){
            $scope.listePays = data;
      })
     }

     $scope.listes();

})


.controller('GroupeCtrl', function($scope, $state,  $http, $ionicLoading, $parcours, $rootScope, SirinDataService) {
      
       $rootScope.userconnecte = $parcours.getUtilisateurById(0);
       $scope.listegroupes;

       var internet = $parcours.getConnecterById(0);
       /*console.log("============================");
       console.log($parcours.getConnecterById(0))
       console.log("============================");*/
       $scope.langue = $parcours.getLangue();

       console.log("nous sommes mntenant ici");

          if (internet==1){

              try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/groupes';
                  $http.get(link).success(function (res){  
                          $scope.listegroupes = res; 
                          $ionicLoading.hide();

                   }).error(function(response){
                       
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: "votre opération a  echoué!!"
                        });
                        $state.go('app.acceuil');
                  });

                  }catch(r){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: " " + r
                    });
              }
          }else{
              console.log("encore zéros internet");
              SirinDataService.getAllGroupes(function(data){
                    $scope.listegroupes = data;
                    console.log($scope.listegroupes);
              })

          }
          
             

     $scope.groupe = function(){
        alert("le mokai pros");
     }

     $scope.sous_espece = function(groupe){
        //$parcours.add(groupe);
        $parcours.removeIndex(1);
        $parcours.addIndex(groupe, 1);
        $state.go('app.sous_espece');
     }

     /*$scope.espece = function(groupe){
        $state.go('app.espece');
     }*/
})

.controller('LoginCtrl', function($scope, $state) {
     alert("le mokai");
})


.controller('CarteCtrl', function($scope, $state, $parcours, $ionicPopup, $ionicLoading, $http) {
     
     $scope.langue = $parcours.getLangue();
     $scope.carte = function(){
        window.open('http://siren1.ammco.org/web/'+$scope.langue.valeur+'/', '_blank');
        
            try{
                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questions';
                  $http.get(link).success(function (res){  
                          $scope.listequestions = res;
                          $ionicLoading.hide();
                   }).error(function(response){
                     $ionicLoading.hide();
                      $ionicPopup.alert({
                          title: 'Error...',
                          template: "votre opération a  echoué!!"
                      });
                      $state.go('app.acceuil');

                  });

                  }catch(r){
                    
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: " " + r
                    });
              } 


             try{
                  $ionicLoading.show({  
                    template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/typeobservations';
                  $http.get(link).success(function (res){  
                          $scope.listetypeobservations = res;
                          $ionicLoading.hide();
                   }).error(function(response){
                      
                       $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: "votre opération a  echoué!!"
                        });
                        $state.go('app.acceuil');
                  });

                  }catch(r){
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: " " + r
                    });
              }

     }

     $scope.carte();

     $scope.groupe = function(typeobservation){
      try{

              navigator.geolocation.getCurrentPosition(function(position){
            
                        $ionicPopup.alert({
                           title: 'Success...',
                           template: "latitude :" + position.coords.latitude  + " longitude : " + position.coords.longitude
                        });

                      $parcours.removeCoordonneIndex(0);
                      $parcours.addCoordonne(position.coords, 0);
              
              },
              function(error){
                $ionicPopup.alert({
                    title: 'Ooops...',
                    template: "Could not get location"
                });
              }, {});
            }catch(r){
              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
          }

          var date = new Date();
          //$parcours.add(typeobservation);
          $parcours.removeIndex(0);
          $parcours.addIndex(typeobservation, 0);
          $state.go('app.groupe');
          
     }
})


.controller('EspeceCtrl', function($scope, $state, $http, $ionicLoading, $parcours, $ionicPopup, $rootScope, SirinDataService) {

     
     var internet = $parcours.getConnecterById(0);

     $rootScope.userconnecte = $parcours.getUtilisateurById(0);
     $scope.typeobservation = $parcours.getById(0);

     $scope.langue = $parcours.getLangue();

     var questionsid = 0;

     $scope.nombrepetit = function(espece){
       
       $parcours.removeIndex(3);
       $parcours.addIndex(espece, 3);

       if($scope.typeobservation.nom_fr== "Animal"){
          if(internet==0){
            questionsid = espece.questions_animal;
          }else{
            questionsid = espece.questions_animal.id;
          }
       }
       if($scope.typeobservation.nom_fr== "Menaces"){
          if(internet == 0){
            questionsid = espece.questions_menaces;
          }else{
            questionsid = espece.questions_menaces.id;
          }
          
       }
       if($scope.typeobservation.nom_fr== "Alimetation"){
          if(internet == 0){
             questionsid = espece.questions_alimentation;
          }else{
             questionsid = espece.questions_alimentation.id;
          }
          
       }
       if($scope.typeobservation.nom_fr== "Signe de présence"){
          if(internet == 0){
            questionsid = espece.questions_signe;
          }else{
            questionsid = espece.questions_signe.id;
          }
          
       }
       
       if(questionsid!=0){

               if(internet== 1){

                   try{
                      $ionicLoading.show({
                        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                      });

                      var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questionsid/' + questionsid;
                      $http.get(link).success(function (res){  
                              $scope.reponse = res; 
                              if($scope.reponse.type_reponse == "text"){
                                  $state.go("app.nombrepetit", {id: $scope.reponse.id}); 
                                  $ionicLoading.hide();
                              }
                              if($scope.reponse.type_reponse == "select"){ 
                                 $ionicLoading.hide();
                                 $state.go("app.ouestanimal", {id: $scope.reponse.id});
                              }
                              $ionicLoading.hide();
                       }).error(function(response){
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                                title: 'Error...',
                                template: "votre opération a  echoué!!"
                            });
                            $state.go('app.acceuil');

                      });

                      }catch(r){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: " erreur garve " + r
                        });
                  }

               }else{

                  SirinDataService.getQuestionById(questionsid, function(data){
                      $scope.reponse = data;
                      if($scope.reponse.type_reponse == "text"){
                          $state.go("app.nombrepetit", {id: $scope.reponse.id}); 
                      }
                      if($scope.reponse.type_reponse == "select"){ 
                         $state.go("app.ouestanimal", {id: $scope.reponse.id});
                      }
                  })

               }           
         }
     }
     
     var today = new Date();
     var date = today.toISOString().substring(0, 10);
     var ladate = {
        date: date,
        heure:'une heure'
     };
     $parcours.removeIndex(4);
     $parcours.addIndex(ladate, 4);
     $scope.especeelement = $parcours.getById(2);
     $scope.espece = $parcours.getById(2);
     $scope.listeespeces = [];
     $scope.projet = $rootScope.userconnecte.projet;
     console.log($rootScope.userconnecte);

     if(internet == 1){
       try{

            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });

            var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/especessousgroupes/'+ $scope.projet.id +'/' + $scope.espece.id;
            $http.get(link).success(function (res){  
                    $scope.listeespeces = res; 
                    $ionicLoading.hide();
             }).error(function(response){
                
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: "votre opération a  echoué!!"
                });
                $state.go('app.acceuil');
            });

            }catch(r){
              $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " erreur grave " + r
              });
        }

      }else{

            SirinDataService.getAllEspecesBySousgroupeId($scope.espece.id, function(data){
                $scope.listeespeces = data;
            })


        }
     
       



})

.controller('Sous_especeCtrl', function($scope, $state, $http , $ionicLoading, $parcours, $ionicPopup, $rootScope, SirinDataService) {

     var internet = $parcours.getConnecterById(0);
     $rootScope.userconnecte = $parcours.getUtilisateurById(0);
     $scope.listesousespeces = [];

     $scope.sousgroupeelement = $parcours.getById(1);
     $scope.groupe = $parcours.getById(1);

     $scope.langue = $parcours.getLangue();


        if(internet==1){

             try{
                $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                });

                var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/sousgroupesgroupes/' + $scope.groupe.id;
                $http.get(link).success(function (res){  
                        $scope.listesousespeces = res; 
                        $ionicLoading.hide();
                 }).error(function(response){

                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: "votre opération a  echoué!!"
                    });
                    $state.go('app.acceuil');

                });

                }catch(r){
                 $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: " erreur grave " + r
                  });
            }

        }else{
            
            SirinDataService.getAllSous_groupesByGroupeId($scope.groupe.id, function(data){
               $scope.listesousespeces = data;
            })

        }
            



     $scope.espece = function(sousgroupe){
        //$parcours.add(sousgroupe);
        $parcours.removeIndex(2);
        $parcours.addIndex(sousgroupe, 2);
        $state.go('app.espece');
     }


     $scope.nombrepetit = function(){
        $state.go('app.nombrepetit');
     }
})




.controller('NombrepetitCtrl', function($scope, $state, $stateParams, $ionicLoading, $ionicPopup, $http, $rootScope, $parcours, SirinDataService) {

    
     var internet = $parcours.getConnecterById(0);

     $rootScope.userconnecte = $parcours.getUtilisateurById(0);
     var idquestion = $stateParams.id;
     $scope.donnees={};

     $scope.langue = $parcours.getLangue();


     if(internet == 1){
         
         try{
          $ionicLoading.show({
            template: '<p>Loading...</p><ion-spinner></ion-spinner>'
          });

          var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questionsid/' + idquestion;
          $http.get(link).success(function (res){  
                  $scope.titrequestion = res.titre_fr; 
                  $ionicLoading.hide();
           }).error(function(response){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: "votre opération a  echoué!!"
                });
                $state.go('app.acceuil');
          });

            }catch(r){
             $ionicLoading.hide();
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
        }

     }else{

          SirinDataService.getQuestionById(idquestion, function(data){
              $scope.titrequestion = data.titre_fr;
              console.log("un gar a fait le bon choix");
          })
     }
     

     

     
     $scope.ouestlanimal = function(donnees){
        console.log("question titre " + $scope.titrequestion);
        $state.go('app.photos',{question:$scope.titrequestion, reponse: donnees.mareponse});
     }
})


.controller('etineraireCtrl', function($scope, $stateParams, $rootScope, $parcours) {
   $rootScope.userconnecte = $parcours.getUtilisateurById(0);
   $scope.depart = $stateParams.depart;
   $scope.arrive = $stateParams.arrive;
   $scope.langue = $parcours.getLangue();
   
})

.controller('OuestanimalCtrl', function($scope, $stateParams, $state, $parcours, SirinDataService, $ionicLoading, $ionicPopup, $rootScope) {
   console.log("cherche");
   var internet = $parcours.getConnecterById(0);
   $rootScope.userconnecte = $parcours.getUtilisateurById(0);
   $scope.depart = $stateParams.depart;
   $scope.arrive = $stateParams.arrive;
   $scope.temoin;
   $scope.data = {
    responses: 'ng'
  };

  $scope.langue = $parcours.getLangue();
   var idreponse = $stateParams.id;


  $scope.super = function(idreponse){
       
    if(internet == 1){

       try{
                $ionicLoading.show({
                  template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                });

                  SirinDataService.findReponseByQuestionId(idreponse).then(function (response) {
                               $scope.listesreponses = response;
                               $scope.titrequestion = response[0].questions.titre_fr;
                                $ionicLoading.hide();
                             },function (errResponse) {
                               console.log('Error while fetching Currencies');
                               $ionicLoading.hide();
                            }
                  );

                }catch(r){
                 $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: " " + r
                  });
          }

    }else{

         console.log(idreponse); 
         SirinDataService.getAllReponsesByQuestionId(idreponse, function(data){
              $scope.listesreponses = data;
              $scope.questionsId = data[0].questions;
               SirinDataService.getQuestionById($scope.questionsId, function(data){
                    $scope.titrequestion = data.titre_fr;
               })
          })

       }
       
  }

   // ceci est un axe très important de ce projet c'est ici que tous ce passe 
   // nous allons exécuter l'algo définis depuis

   $scope.super(idreponse);


   $scope.sirin = function(){

     $parcours.addReponse($scope.data.responses);
     console.log($scope.data.responses);
     if(undefined != $scope.data.responses["questions_next"]){
          
          // dans le cas ou il ya la connexion internet 
          if(internet==1){
             if($scope.data.responses.questions_next["type_reponse"] == "text"){
               $state.go("app.nombrepetit", {id: $scope.data.responses.questions_next.id}); 
            }
            if($scope.data.responses.questions_next["type_reponse"] == "select"){
                $scope.super($scope.data.responses.questions_next.id);
            }
          }else{
            // dans le cas ou il n'ya pas de connexion internet 

             SirinDataService.getQuestionById($scope.data.responses.questions_next, function(data){
                    if(data.type_reponse == "text"){
                         $state.go("app.nombrepetit", {id: $scope.data.responses.questions_next}); 
                    }
                    if(data.type_reponse == "select"){
                         $scope.super($scope.data.responses.questions_next);
                    }
             })
          }  
     }else{
        $state.go('app.photos', {question: 0, reponse:0});
     }
     // $state.go('sirin');
   }


   
})  



.controller('ObservationCtrl', function($scope, $state, $ionicPlatform, $parcours, $ionicLoading, $http, $rootScope, SirinDataService) {
   
       var internet = $parcours.getConnecterById(0);
       $scope.utilisateur = $parcours.getUtilisateurById(0);
       $rootScope.userconnecte = $parcours.getUtilisateurById(0);
       $scope.observations = [];
       $scope.projet = $rootScope.userconnecte.projet;
       var monobservations = [];
       $scope.langue = $parcours.getLangue();
     

        if(internet == 1){

           try{
              
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/observationsuser/'+ $scope.utilisateur.id + '/' + $scope.projet.id;
              $http.get(link).success(function (res){  
                      
                      for (var i = 0; i < res.length; i++) {
                         var element = {};
                         var today = res[i].date;
                         element.date = today.substring(0,10);
                         element.heure = today.substring(11,13);
                         element.minute = today.substring(14,16);
                         element.note = res[i].type_observations.nom_fr;
                         monobservations.splice(i, 0, element);
                      }
                      $scope.observations = monobservations;
                      $parcours.reset();
                      $ionicLoading.hide();

               }).error(function(response){

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');

              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }
        }else{
            // nous attaquons la base de données locale pour recupérer toutes les observations de l'utilisateur connecté
             SirinDataService.getAllObservationByUserAndProjet($scope.utilisateur.monuserid, $scope.projet, function(data){
                  $scope.listesreponses = data;
                  for (var i = 0; i < data.length; i++) {
                         var element = {};
                         var today = data[i].dateo;
                         element.date = today.substring(0,10);
                         element.heure = today.substring(11,13);
                         element.minute = today.substring(14,16);
                         SirinDataService.getTypeObservationsById(data[i].typeObservations, function(data){
                             element.note = data.nom_fr;
                             monobservations.splice(i, 0, element);
                         })
                         
                      }
                      $scope.observations = monobservations;
                      $parcours.reset();
              })

        }
         

          $scope.plusobservation = function(){
            $state.go('app.acceuil');
          }

     
 })


 .controller('MesobservationCtrl', function($scope, $state, $ionicPlatform, $parcours, $ionicLoading, $http, $rootScope, SirinDataService) {
       var internet = $parcours.getConnecterById(0);
       $scope.utilisateur = $parcours.getUtilisateurById(0);
       $rootScope.userconnecte = $parcours.getUtilisateurById(0);
       $scope.observations = [];
       $scope.projet = $rootScope.userconnecte.projet;
       var monobservations = [];
       $scope.langue = $parcours.getLangue();
     
       if(internet == 1){

           try{
              
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/observationsuser/'+ $scope.utilisateur.id + '/' + $scope.projet.id;
              $http.get(link).success(function (res){  
                      
                      for (var i = 0; i < res.length; i++) {
                         var element = {};
                         var today = res[i].date;
                         element.date = today.substring(0,10);
                         element.heure = today.substring(11,13);
                         element.minute = today.substring(14,16);
                         element.note = res[i].type_observations.nom_fr;
                         monobservations.splice(i, 0, element);
                      }
                      $scope.observations = monobservations;
                      $ionicLoading.hide();

               }).error(function(response){

                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');

              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

       }else{
               SirinDataService.getAllObservationByUserAndProjet($scope.utilisateur.monuserid, $scope.projet, function(data){
                  $scope.listesreponses = data;
                  for (var i = 0; i < data.length; i++) {
                         var element = {};
                         var today = data[i].dateo;
                         element.date = today.substring(0,10);
                         element.heure = today.substring(11,13);
                         element.minute = today.substring(14,16);
                         SirinDataService.getTypeObservationsById(data[i].typeObservations, function(data){
                             element.note = data.nom_fr;
                             monobservations.splice(i, 0, element);
                         })
                         
                      }
                      $scope.observations = monobservations;
                      $parcours.reset();
              })

              /*SirinDataService.getAllObservations(function(data){
                  console.log(data);
               })*/
       }
        
        
          $scope.plusobservation = function(){
            $state.go('app.acceuil');
          }

     
 })




.controller('SirinCtrl', function($scope, $stateParams, $state, $parcours, $ionicLoading, $ionicPopup, $http, $rootScope, SirinDataService) {

   var internet = $parcours.getConnecterById(0);

   $rootScope.userconnecte = $parcours.getUtilisateurById(0);
   $scope.observation = $parcours.getById(0);
   $scope.groupe = $parcours.getById(1);
   $scope.sous_espece = $parcours.getById(2);
   $scope.espece = $parcours.getById(3);
  // $scope.date = $parcours.getById(4);
   var today = new Date();
   $scope.heure = today.getHours();
   $scope.minute = today.getMinutes();
   $scope.date = today.toISOString().substring(0, 10);
   $scope.observation1photos = $parcours.getPhotosById(0);
   $scope.observation2description = $parcours.getDescriptionById(0);
  

   $scope.question = $stateParams.question;
   $scope.reponse = $stateParams.reponse;
   $scope.mesreponses = $parcours.getAllReponse();

   $scope.coordonnees = $parcours.getCoordoneById(0);

   $scope.utilisateur = $parcours.getUtilisateurById(0);

   $scope.langue = $parcours.getLangue();

   var latitude = 0;
   var longitude = 0;

   if(undefined != $scope.coordonnees){
       latitude = $scope.coordonnees.latitude;
       longitude = $scope.coordonnees.longitude;
   }


   $scope.showActionsheet = function(){
        //type_observation_id, date, coord_x, coord_y, groupe_id integer, 
        //sous_groupe_id integer, espece_id integer, note, image1, image2, image3, image4, etat
 
        if(internet == 1){
             try{

                $ionicLoading.show({  
                  template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
                });
                

                
                var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/observation';
                $http.post(link,
                   {
                    "projet":$rootScope.userconnecte.projet.id,
                    "dateo":today,
                    "utilisateur":$scope.utilisateur.id,
                    "coordX":latitude,
                    "coordY":longitude,
                    "typeObservations":$scope.observation.id,
                    "groupe":$scope.groupe.id,
                    "sousgroupe":$scope.sous_espece.id,
                    "espece":$scope.espece.id,
                    "img1File":$scope.observation1photos.image1,
                    "img2File":$scope.observation1photos.image2,
                    "img3File":$scope.observation1photos.image3,
                    "img4File":$scope.observation1photos.image4,
                    "note":$scope.observation2description.description
                   }).success(function (res){ 
             
                        if(res==0){
                          
                           $ionicPopup.alert({
                              title: 'Error...',
                              template: "votre enregistrement a  echoué!!"
                          });
                          $ionicLoading.hide();
                          $scope.utilisateur = {};
                        }else{
                            
                            $state.go('app.observation');
                            $ionicLoading.hide();
                            $ionicPopup.alert({
                              title: 'Success...',
                              template: "votre enregistrement a  réussi!!"
                            });
                        }
                       
                 }).error(function(response){
                      console.log(response);
                      $ionicLoading.hide();
                      $ionicPopup.alert({
                          title: 'Error...',
                          template: "votre opération a  echoué!!"
                      });
                      $state.go('app.acceuil');
                });

                }catch(r){
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: " " + r
                  });
               }
        }else{

             console.log("un gars est bien la");

             SirinDataService.deleteAllObservations().then(function(result) {
                  console.log("success delete all Observations");
                  
                  var observation = {
                    "projet":$rootScope.userconnecte.projet,
                    "dateo":today,
                    "utilisateur":$rootScope.userconnecte.monuserid,
                    "coordX":latitude,
                    "coordY":longitude,
                    "typeObservations":$scope.observation.id,
                    "groupe":$scope.groupe.id,
                    "sousgroupe":$scope.sous_espece.id,
                    "espece":$scope.espece.id,
                    "img1File":$scope.observation1photos.image1,
                    "img2File":$scope.observation1photos.image2,
                    "img3File":$scope.observation1photos.image3,
                    "img4File":$scope.observation1photos.image4,
                    "note":$scope.observation2description.description,
                    "etat":0
                   }


                  SirinDataService.createObservations(observation).then(function(result) {
                        console.log("success creating observation");
                        $state.go('app.observation');
                        $ionicPopup.alert({
                          title: 'Success...',
                          template: "votre enregistrement a  réussi!!"
                        });
              
                   })
              })

        }
         




   }
   
})

.controller('PhotosCtrl', function($scope, $stateParams, $state, $parcours, $cordovaCamera, $ionicLoading, $ionicPopup, $rootScope, $http, $ionicModal) {
   
     $scope.pointeur = 0;
     
     $scope.allImages = [{
        'src' : 'img/back1.jpg'
      }, {
        'src' : 'img/back2.jpg'
      }, {
        'src' : 'img/back3.jpg'
      },
      {
        'src' : 'img/back2.jpg'
      }
      ];
     
      $scope.showImages = function(index) {
        $scope.activeSlide = index;
        $scope.showModal('templates/image-popover.html');
      }
     
      $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      }
     
      // Close the modal
      $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove()
      };

     $rootScope.userconnecte = $parcours.getUtilisateurById(0);
     $scope.image1 =0;
     $scope.image2 =0;
     $scope.image3 =0;
     $scope.image4 =0;
     $scope.observation = {};
     $scope.observationAff = {};
     $scope.titrequestion = $stateParams.question;
     $scope.mareponse = $stateParams.reponse;
     $scope.observation.image1 = 0;
     $scope.observation.image2 = 0;
     $scope.observation.image3 = 0;
     $scope.observation.image4 = 0;

     $scope.observationAff.image1 = 0;
     $scope.observationAff.image2 = 0;
     $scope.observationAff.image3 = 0;
     $scope.observationAff.image4 = 0;

     var options = {
         quality : 90,
         destinationType: 0,
         //destinationType: 0, pour image en base 64
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 1
      };

      var option = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 0
      };

      var options2 = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 1
      };

      var option2 = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 0
      };

      var options3 = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 1
      };

      var option3 = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 0
      };

      var options4 = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 1
      };

      var option4 = {
         quality : 90,
         destinationType: 0,
         //encodingType: 1,
         targetWidth: 250,
         targetHeight: 150,
         allowEdit: true,
         sourceType: 0
      };




    $scope.takePhotoD1 = function(){

        $cordovaCamera.getPicture(options).then(function (imageData) {

            var today = new Date();
            var filename = today.toISOString() + ".jpg";
            /*
              - 1 = `FileTransferError.FILE_NOT_FOUND_ERR`
              - 2 = `FileTransferError.INVALID_URL_ERR`
              - 3 = `FileTransferError.CONNECTION_ERR`
              - 4 = `FileTransferError.ABORT_ERR`
              - 5 = `FileTransferError.NOT_MODIFIED_ERR`
            */



            /*var optionstransfert = {
                fileKey: "avatar",
                fileName: filename,
                chunkedMode: false,
                mimeType: "image/png"
              };

           
            try{
                   var filetransfer = new FileTransfer();
                   filetransfer.upload("http://siren1.ammco.org/web/images/observations/tof1", imageData , optionstransfert).then(function(result) {
                      console.log("SUCCESS: " + JSON.stringify(result.response));
                      alert("fichier transferer avec success");
                        }, function(err) {
                            console.log("ERROR: " + JSON.stringify(err));
                            alert("error de transfere");
                        }, function (progress) {
                        // constant progress updates
                    });

              }catch(err){
                 alert(err);
              }*/

              /*var win = function (r) {
                alert("success");
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
              }

              var fail = function (error) {
                  alert(error);
                  alert("An error has occurred: Code = " + error.code);
                  alert("upload error source " + error.source);
                  alert("upload error target " + error.target);
              }
              var fileURL = imageData;
              var options = new FileUploadOptions();
             
              options.fileKey = "file";
              options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
              options.mimeType = "images/jpg";

              var params = {};
              params.value1 = "test";
              params.value2 = "param";
              options.params = params;
              try{
                  var ft = new FileTransfer();
                  //ft.upload(fileURL, encodeURI("http://siren1.ammco.org/web/images/observations/tof1"), win, fail, options);
                  ft.upload(fileURL, "http://mokai.pros.org/web/images/observations/tof1", win, fail, options);
              }catch(error){
                  alert(error);
              }*/

                /*try{

                    $ionicLoading.show({
                      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                    });
                    var link = 'http://192.168.43.19/siren/web/app_dev.php/fr/api/inscription';
                    $http.post(link, {
                        'image':image 
                    }).success(function (res){   
                          alert("le mokai pros : ========= " + JSON.stringify(res));
                          $ionicLoading.hide();
                     }).error(function(response){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: "votre opération a  echoué!!"
                        });
                        $state.go('app.acceuil');
                    });

                    }catch(r){
                      $ionicLoading.hide();
                      $ionicPopup.alert({
                          title: 'Error...',
                          template: " " + r
                      });
                }*/
              var image = "data:image/jpeg;base64," + imageData;
              $scope.observation.image1 = image;
              $scope.observationAff.image1 = image;
              $scope.image1 =1;
        }, function (err) {
            console.log(err);
        });

        
    }

    $scope.takePhotoDD1 = function(){
        $cordovaCamera.getPicture(option).then(function(imageData) {
         
         
         var today = new Date();
           var filename = today.toISOString() + ".png";

           var image = "data:image/jpeg;base64," + imageData;
           $scope.observation.image1 = image;
           $scope.observationAff.image1 = image; 
           //$scope.observation.image1 = filename;
           $scope.image1 = 1;
        }, function(err) {
           console.log(err);
        });
    }



    $scope.takePhotoD2 = function(){
       $cordovaCamera.getPicture(options2).then(function(imageData) {
             
           
             var today = new Date();
             var filename = today.toISOString() + ".png";

             var image = "data:image/jpeg;base64," + imageData;
             $scope.observation.image2 = image;
             $scope.observationAff.image2 = image;
             $scope.image2 =1;
          }, function(err) {
        console.log(err);
      });
    }

    $scope.takePhotoDD2 = function(){
       $cordovaCamera.getPicture(option2).then(function(imageData) {
            
           $scope.observationAff.image2 = imageData;
           var today = new Date();
           var filename = today.toISOString() + ".png";

         var image = "data:image/jpeg;base64," + imageData;
         $scope.observation.image2 = image;
         $scope.observationAff.image2 = image;
         
         $scope.image2 =1;
      }, function(err) {
         console.log(err);
      });
       
    }

    $scope.takePhotoD3 = function(){
       $cordovaCamera.getPicture(options3).then(function(imageData) {
             
             $scope.observationAff.image3 = imageData;
             var today = new Date();
             var filename = today.toISOString() + ".png";

             var image = "data:image/jpeg;base64," + imageData;
             $scope.observation.image3 = image;
             $scope.observationAff.image3 = image;
             $scope.image3 =1;
          }, function(err) {
        console.log(err);
      });
    }

    $scope.takePhotoDD3 = function(){
       $cordovaCamera.getPicture(option3).then(function(imageData) {

           $scope.observationAff.image3 = imageData;
           var today = new Date();
           var filename = today.toISOString() + ".png";

         var image = "data:image/jpeg;base64," + imageData;
         $scope.observation.image3 = image;
         $scope.observationAff.image3 = image;
         $scope.image3 =1;
      }, function(err) {
         console.log(err);
      });
       
    }

    $scope.takePhotoD4 = function(){
       $cordovaCamera.getPicture(options4).then(function(imageData) {


            $scope.observationAff.image4 = imageData;
            var today = new Date();
            var filename = today.toISOString() + ".png";


             var image = "data:image/jpeg;base64," + imageData;
             $scope.observation.image4 = image;
             $scope.observationAff.image4 = image;
             $scope.image4 =1;
          }, function(err) {
        console.log(err);
      });
    }

    $scope.takePhotoDD4 = function(){
       $cordovaCamera.getPicture(option4).then(function(imageData) {

         var today = new Date();
           var filename = today.toISOString() + ".png";

        
         var image = "data:image/jpeg;base64," + imageData;
         $scope.observation.image4 = image;
         $scope.observationAff.image4 = image;
         $scope.image4 =1;
      }, function(err) {
         console.log(err);
      });     
    }



    $scope.deleteimage1 = function(){
       $scope.image1 =0;
       $scope.observation.image1 ='';
       $scope.observationAff.image1 = '';
    }

    $scope.deleteimage2 = function(){
       $scope.image2 =0;
       $scope.observation.image2 ='';
       $scope.observationAff.image2 = '';
    }

    $scope.deleteimage3 = function(){
       $scope.image3 =0;
       $scope.observation.image3 ='';
       $scope.observationAff.image3 = '';
    }

    $scope.deleteimage4 = function(){
       $scope.image4 =0;
       $scope.observation.image4 ='';
       $scope.observationAff.image4= '';
    }

    $scope.suivant = function(observation){
        $parcours.addPhotos(observation, 0);
        $state.go('app.description',{question:$scope.titrequestion, reponse: $scope.mareponse});
    }
})


.controller('DescriptionCtrl', function($scope, $stateParams, $state, $parcours, $rootScope) {
     $rootScope.userconnecte = $parcours.getUtilisateurById(0);
     $scope.titrequestion = $stateParams.question;
     $scope.mareponse = $stateParams.reponse;
     $scope.monobservation = {};   

     

    $scope.suivant = function(monobservation){
        $parcours.addDescription(monobservation, 0);
        $state.go('sirin',{question:$scope.titrequestion, reponse: $scope.mareponse});
    }
})


.controller('NotificationCtrl', function($scope, $stateParams, $state, $parcours, $rootScope, $ionicLoading, $http, $ionicPopup) {
     $rootScope.userconnecte = $parcours.getUtilisateurById(0);
     $scope.langue = $parcours.getLangue();

     try{
              
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/notificationsprojet/' + $rootScope.userconnecte.id;
              $http.get(link).success(function (res){  
                      $scope.notifications = res;
                      $ionicLoading.hide();

               }).error(function(response){
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  //$state.go('app.acceuil');
              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

})




.controller('PlaylistCtrl', function($scope, $stateParams, $parcours, $rootScope) {
   $rootScope.userconnecte = $parcours.getUtilisateurById(0);   
})


.controller('ProfilsCtrl', function($scope, $stateParams, $parcours, $rootScope) {
   $rootScope.userconnecte = $parcours.getUtilisateurById(0); 
   $scope.date = $rootScope.userconnecte.date.substring(0, 10);
   
})

.controller('SynchronisationCtrl', function($scope, $stateParams, $parcours, $rootScope, SirinDataService, $ionicLoading, $http) {
   
   var compteur = 0;
   $rootScope.userconnecte = $parcours.getUtilisateurById(0);
   console.log($rootScope.userconnecte);

         SirinDataService.deleteAllPays().then(function(result) {
             console.log("success delete all pays");

             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/pays';
                  $http.get(link).success(function (res){  
                          $scope.listepays = res;
                          var val = 0; 
                          console.log($scope.listepays.length);
                          for (var i = 0; i < $scope.listepays.length; i++) {
                               SirinDataService.createPays($scope.listepays[i]).then(function(result) {
                                   console.log("success creating pays");
                                   val = val + 1;
                                   if(val==$scope.listepays.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })


          SirinDataService.deleteAllFonctions().then(function(result) {
             console.log("success delete all Fonctions");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/fonctions';
                  $http.get(link).success(function (res){  
                          $scope.listefonctions = res;
                          var val = 0; 
                          console.log($scope.listefonctions.length);
                          for (var i = 0; i < $scope.listefonctions.length; i++) {
                               SirinDataService.createFonctions($scope.listefonctions[i]).then(function(result) {
                                   console.log("success creating Fonctions");
                                   val = val + 1;
                                   if(val==$scope.listefonctions.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          SirinDataService.deleteAllGroupes().then(function(result) {
             console.log("success delete all Groupes");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/groupes';
                  $http.get(link).success(function (res){  
                          $scope.listegroupes = res;
                          var val = 0; 
                          console.log("======================= les groupes");
                          console.log(res);
                          console.log($scope.listegroupes.length);
                          for (var i = 0; i < $scope.listegroupes.length; i++) {
                               SirinDataService.createGroupes($scope.listegroupes[i]).then(function(result) {
                                   console.log("success creating Groupes");
                                   val = val + 1;
                                   if(val==$scope.listegroupes.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          SirinDataService.deleteAllSous_groupes().then(function(result) {
             
             console.log("success delete all Sous_groupes");
             
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });

                  var link = 'http://siren1.ammco.org/web/fr/api/sousgroupes';
                  $http.get(link).success(function (res){  
                          $scope.listesous_groupes = res;
                          var val = 0; 
                          for (var i = 0; i < $scope.listesous_groupes.length; i++) {
                               var sous_groupe = {
                                 "nom_fr": $scope.listesous_groupes[i].nom_fr, 
                                 "nom_en": $scope.listesous_groupes[i].nom_en, 
                                 "image": $scope.listesous_groupes[i].image, 
                                 "description_fr": $scope.listesous_groupes[i].description_fr, 
                                 "description_en":$scope.listesous_groupes[i].description_en, 
                                 "groupes":$scope.listesous_groupes[i].groupes.id
                               }
                               SirinDataService.createSous_groupes(sous_groupe).then(function(result) {
                                   console.log("success creating Sous_groupes");
                                   val = val + 1;
                                   if(val==$scope.listesous_groupes.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })


          SirinDataService.deleteAllReponses().then(function(result) {
             console.log("success delete all Reponses");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/reponses';
                  $http.get(link).success(function (res){  
                          $scope.listereponses = res;
                          var val = 0; 
                          console.log($scope.listereponses.length);
                          console.log(res);
                          for (var i = 0; i < $scope.listereponses.length; i++) {

                              if(undefined!= $scope.listereponses[i].questions_next){
                                 var reponse = {
                                    "titre_fr": $scope.listereponses[i].titre_fr, 
                                    "titre_en": $scope.listereponses[i].titre_en,
                                    "questions": $scope.listereponses[i].questions.id, 
                                    "questions_next": $scope.listereponses[i].questions_next.id
                                  }
                              }else{
                                  var reponse = {
                                  "titre_fr": $scope.listereponses[i].titre_fr, 
                                  "titre_en": $scope.listereponses[i].titre_en,
                                  "questions": $scope.listereponses[i].questions.id
                                  
                                 }
                              }
                               

                               SirinDataService.createReponses(reponse).then(function(result) {
                                   console.log("success creating reponse");
                                   val = val + 1;
                                   if(val==$scope.listereponses.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          SirinDataService.deleteAllTypeObservations().then(function(result) {
             console.log("success delete all TypeObservations");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/typeobservations';
                  $http.get(link).success(function (res){  
                          $scope.listetypeObservations = res;
                          var val = 0; 
                          console.log($scope.listetypeObservations.length);
                          for (var i = 0; i < $scope.listetypeObservations.length; i++) {
                               SirinDataService.createtypeObservations($scope.listetypeObservations[i]).then(function(result) {
                                   console.log("success creating typeobservations");
                                   val = val + 1;
                                   if(val==$scope.listetypeObservations.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          SirinDataService.deleteAllEspeces().then(function(result) {
             console.log("success delete all Especes");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/especes/' + $rootScope.userconnecte.projet.id;//projet_id
                  $http.get(link).success(function (res){  
                          $scope.listeespeces = res;
                          var val = 0; 
                          console.log($scope.listeespeces.length);
                          for (var i = 0; i < $scope.listeespeces.length; i++) {
                               var espece = {
                                "nom_fr":$scope.listeespeces[i].nom_fr, 
                                "nom_en":$scope.listeespeces[i].nom_en,
                                "image": $scope.listeespeces[i].image, 
                                "description_fr": $scope.listeespeces[i].description_fr, 
                                "description_en": $scope.listeespeces[i].description_en, 
                                "sous_groupes": $scope.listeespeces[i].sous_groupes.id, 
                                "questions_animal": $scope.listeespeces[i].questions_animal.id, 
                                "questions_menaces": $scope.listeespeces[i].questions_menances.id, 
                                "questions_signe": $scope.listeespeces[i].questions_signe.id, 
                                "questions_alimentation": $scope.listeespeces[i].questions_alimentation.id
                               }
                               SirinDataService.createEspeces(espece).then(function(result) {
                                   console.log("success creating especes");
                                   val = val + 1;
                                   if(val==$scope.listeespeces.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          SirinDataService.deleteAllProjets().then(function(result) {
             console.log("success delete all Projets");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/projet/' + $rootScope.userconnecte.id //$rootScope.userconnecte.id;
                  $http.get(link).success(function (res){  
                          $scope.listeprojets = res;
                          var val = 0; 
                          console.log($scope.listeprojets.length);
                          for (var i = 0; i < $scope.listeprojets.length; i++) {
                               var projet = {
                                "nom": $scope.listeprojets[i].nom, 
                                "lieu": $scope.listeprojets[i].lieu, 
                                "public": $scope.listeprojets[i].public, 
                                "pays": $scope.listeprojets[i].pays.id, 
                                "utilisateurs": $scope.listeprojets[i].utilisateurs.id
                               }
                               SirinDataService.createProjets(projet).then(function(result) {
                                   console.log("success creating projet");
                                   val = val + 1;
                                   if(val==$scope.listeprojets.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          


          SirinDataService.deleteAllUtilisateurs().then(function(result) {
             console.log("success delete all Utilisateurs");
                 var utilisateurs = {
                  "username":$rootScope.userconnecte.username, 
                  "email":$rootScope.userconnecte.email, 
                  "password": $rootScope.userconnecte.password, 
                  "ville": $rootScope.userconnecte.ville, 
                  "telephone": $rootScope.userconnecte.telephone, 
                  "pays": $rootScope.userconnecte.pays.id, 
                  "fonctions": $rootScope.userconnecte.fonctions.id, 
                  "projet":$rootScope.userconnecte.projet.id,
                  "monuserid":$rootScope.userconnecte.id
                 }
                 SirinDataService.createUtilisateurs(utilisateurs).then(function(result) {
                     console.log("success creating utilisateurs");
                 })
                          
          })

          

          SirinDataService.deleteAllInscription().then(function(result) {
             console.log("success delete all Inscription");
                 var inscription = {
                  "username":$rootScope.userconnecte.username, 
                  "email":$rootScope.userconnecte.email, 
                  "password": $rootScope.userconnecte.password, 
                  "ville": $rootScope.userconnecte.ville, 
                  "telephone": $rootScope.userconnecte.telephone, 
                  "pays": $rootScope.userconnecte.pays.id, 
                  "fonctions": $rootScope.userconnecte.fonctions.id,
                  "monuserid" : $rootScope.userconnecte.id
                 }
                 SirinDataService.createInscription(inscription).then(function(result) {
                     console.log("success creating inscription");
                 })
                          
          })

      
          SirinDataService.deleteAllQuestions().then(function(result) {
             console.log("success delete all Questions");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/questions';
                  $http.get(link).success(function (res){  
                          $scope.listequestions = res;
                          var val = 0; 
                          console.log($scope.listequestions.length);
                          console.log("nous sommes dans les questions")
                          for (var i = 0; i < $scope.listequestions.length; i++) {
                              var question = {
                                "titre_fr": $scope.listequestions[i].titre_fr, 
                                "titre_en":$scope.listequestions[i].titre_en, 
                                "type_reponse":$scope.listequestions[i].type_reponse, 
                                "interval":$scope.listequestions[i].interval, 
                                "type_debut":$scope.listequestions[i].type_debut
                              }
                               SirinDataService.createQuestions(question).then(function(result) {
                                   console.log("success creating question");
                                   val = val + 1;
                                   if(val==$scope.listequestions.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })

          
          /*SirinDataService.deleteAllObservations().then(function(result) {
             console.log("success delete all Observations");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/observations';
                  $http.get(link).success(function (res){  
                          $scope.listeobservations = res;
                          var val = 0; 
                          console.log($scope.listeobservations.length);
                          for (var i = 0; i < $scope.listeobservations.length; i++) {
                               SirinDataService.createObservations($scope.listeobservations[i]).then(function(result) {
                                   console.log("success creating Observations");
                                   val = val + 1;
                                   if(val==$scope.listeobservations.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })*/









          /*SirinDataService.deleteResultats().then(function(result) {
             console.log("success delete all Resultats");
             try{

                  $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                  });
                  var link = 'http://siren1.ammco.org/web/fr/api/resultats/{contenu}/{question}/{observation}';
                  $http.get(link).success(function (res){  
                          $scope.listeresultats = res;
                          var val = 0; 
                          console.log($scope.listeresultats.length);
                          for (var i = 0; i < $scope.listeresultats.length; i++) {
                               SirinDataService.createResultats($scope.listeresultats[i]).then(function(result) {
                                   console.log("success creating pays");
                                   val = val + 1;
                                   if(val==$scope.listeresultats.length){
                                     compteur++;
                                      $ionicLoading.hide();
                                    }
                               })
                          }
                          
                   }).error(function(response){
                      alert("premier");
                      $ionicLoading.hide();
                  });

                  }catch(r){
                    alert("deux" + r);
                    $ionicLoading.hide();
              }
          })*/
    



   /*function onSaveSuccess(){
       alert("success");
   }

   

   $scope.savePays = function(){
       $scope.pays = {};
       $scope.pays.nom_fr = "Cameroun";
       $scope.pays.nom_en = "Cameroon";
       $scope.pays.code_tel = "+237";
       $scope.pays.sigle = "CMR";

      if(!$scope.pays.id){
        SirinDataService.createPays($scope.pays).then(onSaveSuccess)
      } else {
        SirinDataService.updatePays($scope.pays).then(onSaveSuccess)
      }
    }
 
    try{

      $scope.savePays();

     }catch(err){
      alert(err)
     } 
  
    $scope.listes = function(){
      SirinDataService.getAllPays(function(data){
            $scope.listePays = data;
      })
    }*/
   
})


.controller('ProjetCtrl', function($scope, $stateParams, $state,  $parcours, $rootScope, $ionicPopup, $http, $ionicLoading) {
        $scope.data={};
        $rootScope.userconnecte = $parcours.getUtilisateurById(0);
        $scope.listeprojets ;
        $scope.langue = $parcours.getLangue();


         try{
              
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/projetutilisateur/' + $rootScope.userconnecte.id;
              $http.get(link).success(function (res){  
                     
                      $scope.listeprojets = res;
                      $ionicLoading.hide();

                     $ionicPopup.show({
                        title: 'Changer de Projet <hr>',
                        templateUrl: 'templates/partials/projetbyuser.html',
                       // template: '<ion-radio ng-repeat="projet in listeprojets" ng-model="data.langue" ng-value="fr">{{projet.nom}}</ion-radio>',
                        
                        scope: $scope,
                        buttons: [
                          {
                            text: '<b style="border-radius: 5px;">Enregistrer</b>',
                            type: 'button button-block button-positive',
                            onTap: function(e) {

                                try{
              
                                      $ionicLoading.show({
                                        template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                                      });
                                      var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/changerprojet/' + $rootScope.userconnecte.id + '/' + $scope.data.projetid;
                                      $http.get(link).success(function (res){  
                                              $ionicLoading.hide();
                                              if(res==0){
                                                   $ionicPopup.alert({
                                                      title: 'Error...',
                                                      template: "votre opération a  echoué!!"
                                                  });
                                                  $ionicLoading.hide();
                                                  $scope.utilisateur = {};
                                                }else{
                                                   
                                                    $scope.userconnecte = $parcours.getUtilisateurById(0);
                                                    $scope.userconnecte.projet = res.projet;
                                                    $parcours.removeUtilisateurIndex(0);
                                                    $parcours.addUtilisateur($scope.userconnecte, 0);
                                                    $rootScope.userconnecte = $parcours.getUtilisateurById(0);
                                                    $scope.supers();
                                                    $ionicLoading.hide();
                                                    $ionicPopup.alert({
                                                      title: 'Success...',
                                                      template: "votre opération a  réussi!!"
                                                  });
                                                }

                                       }).error(function(response){
                                            $ionicLoading.hide();
                                            $ionicPopup.alert({
                                                title: 'Error...',
                                                template: "votre opération a  echoué!!"
                                            });
                                            $scope.supers();
                                            
                                      });

                                      }catch(r){
                                        $ionicLoading.hide();
                                        $ionicPopup.alert({
                                            title: 'Error...',
                                            template: " " + r
                                        });
                                  }



                            }
                          }
                        ]
                      });

               }).error(function(response){
                  
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: "votre opération a  echoué!!"
                    });
                    $scope.supers();
              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }
          

      $scope.supers = function(){    

         var options = {
            enableHighAccuracy: true,
            timeout: 9000,
            maximumAge: 0
          };

         $scope.listetypeobservation = [];

         $scope.langue = $parcours.getLangue();

         try{
              $ionicLoading.show({  
                template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/typeobservations';
              $http.get(link).success(function (res){  
                      $scope.listetypeobservations = res;
                      $ionicLoading.hide();
               }).error(function(response){
                  
                   $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: "votre opération a  echoué!!"
                    });
                    $state.go('app.acceuil');
              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

       
         try{
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questions';
              $http.get(link).success(function (res){  
                      $scope.listequestions = res;
                      $ionicLoading.hide();
               }).error(function(response){
                 $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');

              });

              }catch(r){
                
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

              


       $scope.groupe = function(typeobservation){
          try{

                navigator.geolocation.getCurrentPosition(function(position){
              
                          $ionicPopup.alert({
                             title: 'Success...',
                             template: "latitude :" + position.coords.latitude  + " longitude : " + position.coords.longitude
                          });

                        $parcours.removeCoordonneIndex(0);
                        $parcours.addCoordonne(position.coords, 0);
                
                },
                function(error){
                  $ionicPopup.alert({
                      title: 'Ooops...',
                      template: "Could not get location"
                  });
                }, {});
              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
            }

            var date = new Date();
            //$parcours.add(typeobservation);
            $parcours.removeIndex(0);
            $parcours.addIndex(typeobservation, 0);
            $state.go('app.groupe');
            
       }

     }

})


.controller('CommentaireCtrl', function($scope, $stateParams, $state,  $parcours, $rootScope, $ionicPopup, $ionicLoading, $http) {
          $scope.data={};
         
          $rootScope.userconnecte = $parcours.getUtilisateurById(0);
          $scope.langue = $parcours.getLangue();

          $ionicPopup.show({
          title: 'Laisser un commentaire ou signaler un problèm au développeur! <hr>',
          template: '<textarea ng-model="data.values" placeholder="placez le texte ici"> </textarea>',
          
          scope: $scope,
          buttons: [
            {
              text: '<b style="border-radius: 5px;">Enregistrer</b>',
              type: 'button button-block button-positive',
              onTap: function(e) {

                try{

                      $ionicLoading.show({  
                        template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
                      });
                      var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/feedback/' +  $rootScope.userconnecte.username +'/' + $rootScope.userconnecte.email + '/'+ $scope.data.values;
                      
                      $http.get(link).success(function (res){ 

                              if(res==0){
                                 $state.go('app.acceuil');
                                 $ionicPopup.alert({
                                    title: 'Error...',
                                    template: "votre enregistrement a  echoué!!"
                                });
                                $ionicLoading.hide();
                                $scope.utilisateur = {};
                              }else{
                                 
                                  $scope.supers();
                                  $ionicLoading.hide();
                                  $ionicPopup.alert({
                                    title: 'Success...',
                                    template: "Merci de nous avoir \n laissé un commentaire!!"
                                });
                              }
                             
                       }).error(function(response){

                          $ionicLoading.hide();
                          $ionicPopup.alert({
                              title: 'Error...',
                              template: "votre opération a  echoué!!"
                          });
                          $state.go('app.acceuil');
                      });

                      }catch(r){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: " " + r
                        });
                     }
              }
            }
          ]
        });


     $scope.supers = function(){    

         var options = {
            enableHighAccuracy: true,
            timeout: 9000,
            maximumAge: 0
          };

         $scope.listetypeobservation = [];

         $scope.langue = $parcours.getLangue();

         try{
              $ionicLoading.show({  
                template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/typeobservations';
              $http.get(link).success(function (res){  
                      $scope.listetypeobservations = res;
                      $ionicLoading.hide();
               }).error(function(response){
                  
                   $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: "votre opération a  echoué!!"
                    });
                    $state.go('app.acceuil');
              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

       
         try{
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questions';
              $http.get(link).success(function (res){  
                      $scope.listequestions = res;
                      $ionicLoading.hide();
               }).error(function(response){
                 $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');

              });

              }catch(r){
                
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

              


       $scope.groupe = function(typeobservation){
          try{

                navigator.geolocation.getCurrentPosition(function(position){
              
                          $ionicPopup.alert({
                             title: 'Success...',
                             template: "latitude :" + position.coords.latitude  + " longitude : " + position.coords.longitude
                          });

                        $parcours.removeCoordonneIndex(0);
                        $parcours.addCoordonne(position.coords, 0);
                
                },
                function(error){
                  $ionicPopup.alert({
                      title: 'Ooops...',
                      template: "Could not get location"
                  });
                }, {});
              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
            }

            var date = new Date();
            //$parcours.add(typeobservation);
            $parcours.removeIndex(0);
            $parcours.addIndex(typeobservation, 0);
            $state.go('app.groupe');
            
       }

     }


})


.controller('MesprojetCtrl', function($scope, $stateParams, $state,  $parcours, $rootScope, $ionicPopup, $ionicLoading, $http) {
          $scope.data={};
          $rootScope.userconnecte = $parcours.getUtilisateurById(0);
          $scope.mesprojets; 
          $scope.mesobservationsparprojets;
          $scope.testeur = 0;         
          $scope.titre = "Mes Projets";
          $scope.langue = $parcours.getLangue();

      
                try{

                      $ionicLoading.show({  
                        template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
                      });
                      var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/projetutilisateur/' + $rootScope.userconnecte.id;
                      
                      $http.get(link).success(function (res){ 

                              if(res==0){
                                 $ionicPopup.alert({
                                    title: 'Error...',
                                    template: "votre enregistrement a  echoué!!"
                                });
                                $ionicLoading.hide();
                                $scope.utilisateur = {};
                              }else{
                                 
                                  $scope.mesprojets = res;
                                  $ionicLoading.hide();
                              }
                             
                       }).error(function(response){

                          $ionicLoading.hide();
                          $ionicPopup.alert({
                              title: 'Error...',
                              template: "votre opération a  echoué!!"
                          });
                          $state.go('app.acceuil');
                      });

                      }catch(r){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: " " + r
                        });
                     }


            $scope.findObservationByProjet = function(id){
                 
                try{

                      $ionicLoading.show({  
                        template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
                      });
                      var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/observationsuser/' +$rootScope.userconnecte.id + '/'+ id;
                      
                      $http.get(link).success(function (res){ 
                              
                               $scope.titre = "Mes Observations par Projets";

                              if(res==0){
                                $scope.testeur = 1;
                                $scope.mesobservationsparprojets = res;
                                $ionicLoading.hide();
                              }else{
                                  $scope.testeur = 1;
                                  $scope.mesobservationsparprojets = res;
                                  $ionicLoading.hide();
                              }
                             
                       }).error(function(response){

                          $ionicLoading.hide();
                          $ionicPopup.alert({
                              title: 'Error...',
                              template: "votre opération a  echoué!!"
                          });
                          $state.go('app.acceuil');
                      });

                      }catch(r){
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Error...',
                            template: " " + r
                        });
                     }
            }

                     

})





.controller('LangueCtrl', function($scope, $stateParams, $state,  $parcours, $translate, $rootScope, $ionicPopup, $ionicLoading, $http) {

          
          $scope.data={};
         
          $ionicPopup.show({
          title: 'Changer de langue <hr>',
          templateUrl: 'templates/partials/puppup.html',
          //template: '<ion-radio ng-model="data.langue" ng-value="fr">Francçais</ion-radio> <ion-radio ng-model="data.langue" ng-value="en">Anglais</ion-radio> ',
          scope: $scope,
          buttons: [
            {
              text: '<b style="border-radius: 5px;">Enregistrer</b>',
              type: 'button button-block button-positive',
              onTap: function(e) {
                   var langue = {
                      "valeur": $scope.data.langue
                   };
                  $parcours.setLangue(langue);
                  $translate.use($scope.data.langue);
                  $scope.supers();

              }
            }
          ]
        });


        $scope.supers = function(){    

         var options = {
            enableHighAccuracy: true,
            timeout: 9000,
            maximumAge: 0
          };

         $scope.listetypeobservation = [];

         $scope.langue = $parcours.getLangue();

         try{
              $ionicLoading.show({  
                template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/typeobservations';
              $http.get(link).success(function (res){  
                      $scope.listetypeobservations = res;
                      $ionicLoading.hide();
               }).error(function(response){
                  
                   $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Error...',
                        template: "votre opération a  echoué!!"
                    });
                    $state.go('app.acceuil');
              });

              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

       
         try{
              $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
              });
              var link = 'http://siren1.ammco.org/web/'+$scope.langue.valeur+'/api/questions';
              $http.get(link).success(function (res){  
                      $scope.listequestions = res;
                      $ionicLoading.hide();
               }).error(function(response){
                 $ionicLoading.hide();
                  $ionicPopup.alert({
                      title: 'Error...',
                      template: "votre opération a  echoué!!"
                  });
                  $state.go('app.acceuil');

              });

              }catch(r){
                
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
          }

              


       $scope.groupe = function(typeobservation){
          try{

                navigator.geolocation.getCurrentPosition(function(position){
              
                          $ionicPopup.alert({
                             title: 'Success...',
                             template: "latitude :" + position.coords.latitude  + " longitude : " + position.coords.longitude
                          });

                        $parcours.removeCoordonneIndex(0);
                        $parcours.addCoordonne(position.coords, 0);
                
                },
                function(error){
                  $ionicPopup.alert({
                      title: 'Ooops...',
                      template: "Could not get location"
                  });
                }, {});
              }catch(r){
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Error...',
                    template: " " + r
                });
            }

            var date = new Date();
            //$parcours.add(typeobservation);
            $parcours.removeIndex(0);
            $parcours.addIndex(typeobservation, 0);
            $state.go('app.groupe');
            
       }

     }
       
});
