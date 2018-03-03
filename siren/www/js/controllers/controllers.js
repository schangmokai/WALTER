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
    console.log('Doing login', $scope.loginData);

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

.controller('AcceuilCtrl', function($scope, $state, SirinDataService, $ionicPlatform, $http, $ionicLoading, $ionicPopup) {
   
       // 
       $scope.listetypeobservation = [];

       try{
            $ionicLoading.show({  
              template: '<p>Loading...</p><ion-spinner icon ion-loading-a></ion-spinner>'
            });
            var link = 'http://siren.ammco.org/web/api/typeobservations';
            $http.get(link).success(function (res){  
                    $scope.listetypeobservations = res;
                    $ionicLoading.hide();
             }).error(function(response){

            });

            }catch(r){
              alert(r);
        }

     
       try{
            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
            var link = 'http://siren.ammco.org/web/api/questions';
            $http.get(link).success(function (res){  
                    $scope.listequestions = res;
                    $ionicLoading.hide();
                    console.log($scope.listequestions);
             }).error(function(response){

            });

            }catch(r){
              alert(r);
        }

            



     $scope.groupe = function(typeobservation){
        try{

              var options = {timeout: 10000, enableHighAccuracy: true};
              navigator.geolocation.getCurrentPosition(function(position){
            
              $ionicPopup.alert({
                  title: 'Success...',
                  template: "cool........ latitude :" + position.coords.latitude + "altitude :" + position.coords.altitude + " longitude : " + position.coords.longitude
              });
              
              },
              function(error){
                $ionicPopup.alert({
                    title: 'Ooops...',
                    template: "Could not get location"
                });
              },options);
            }catch(r){
              $ionicPopup.alert({
                  title: 'Error...',
                  template: " " + r
              });
          }

          $state.go('app.groupe');
       
     }

     $scope.inscription = function(){
        $state.go('inscription');
     }

     function onSaveSuccess(){
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
 
   /* try{

        $scope.savePays();

     }catch(err){
      alert(err)
     } 
  */
    

    $scope.listes = function(){
      SirinDataService.getAllPays(function(data){
            $scope.listePays = data;
            console.log($scope.listePays);
      })
    }
})

.controller('ObservationCtrl', function($scope, $state, $ionicPlatform) {
     
 })



.controller('InscriptionCtrl', function($scope, $state, SirinDataService, $ionicPlatform) {
     $scope.paysselect;
     $scope.temoininscription = 0;
     $scope.listePays;

     $scope.groupe = function(){
        $state.go('app.groupe');
     }

     $scope.inscrire = function(){
       //$state.go('app.groupe');
       $scope.temoininscription = 1;
     }

     $scope.connecte = function(){
       $state.go('app.groupe');
       $scope.temoininscription = 0;
     }

     $scope.listes = function(){
      SirinDataService.getAllPays(function(data){
            $scope.listePays = data;
      })
     }

     $scope.listes();

})


.controller('GroupeCtrl', function($scope, $state,  $http, $ionicLoading) {
      
       $scope.listegroupes = [];

       try{

            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
            var link = 'http://siren.ammco.org/web/api/groupes';
            $http.get(link).success(function (res){  
                    $scope.listegroupes = res; 
                    $ionicLoading.hide();
                    console.log(listegroupes);
             }).error(function(response){

            });

            }catch(r){
              alert(r);
        }

     $scope.groupe = function(){
        alert("le mokai pros");
     }

     $scope.sous_espece = function(groupe){
        $state.go('app.sous_espece');
     }

     $scope.espece = function(groupe){
        $state.go('app.espece');
     }
})

.controller('LoginCtrl', function($scope, $state) {
     console.log("le mokai");
     alert("le mokai");
})



.controller('EspeceCtrl', function($scope, $state, $http, $ionicLoading) {
     
     $scope.sous_espece = function(espece){
        $state.go('app.sous_espece');
     }

     $scope.nombrepetit = function(){
        $state.go('app.nombrepetit');
     }

     $scope.listeespeces = [];
       try{
            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });

            var link = 'http://siren.ammco.org/web/api/especes';
            $http.get(link).success(function (res){  
                    $scope.listeespeces = res; 
                    $ionicLoading.hide();
             }).error(function(response){

            });

            }catch(r){
              alert(r);
        }
})

.controller('Sous_especeCtrl', function($scope, $state, $http , $ionicLoading) {

     $scope.listesousespeces = [];

       try{
            $ionicLoading.show({
              template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });

            var link = 'http://siren.ammco.org/web/api/sousgroupes';
            $http.get(link).success(function (res){  
                    $scope.listesousespeces = res; 
                    $ionicLoading.hide();
             }).error(function(response){

            });

            }catch(r){
              alert(r);
        }
     $scope.espece = function(groupe){
        $state.go('app.espece');
     }

     $scope.nombrepetit = function(){
        $state.go('app.nombrepetit');
     }
})




.controller('NombrepetitCtrl', function($scope, $state) {
    $scope.ouestlanimal = function(){
        $state.go('app.ouestanimal');
     }
})


.controller('etineraireCtrl', function($scope, $stateParams) {
   
   $scope.depart = $stateParams.depart;
   $scope.arrive = $stateParams.arrive;
   
})

.controller('OuestanimalCtrl', function($scope, $stateParams, $state) {
   
   $scope.depart = $stateParams.depart;
   $scope.arrive = $stateParams.arrive;

   $scope.sirin = function(){
      $state.go('sirin');
   }
   
})

.controller('SirinCtrl', function($scope, $stateParams, $state) {
   $scope.showActionsheet = function(){

        $state.go('app.observation');
   }
   
})

.controller('PlaylistCtrl', function($scope, $stateParams) {

});
