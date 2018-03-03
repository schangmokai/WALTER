angular.module('starter.controllers', [])

.controller('ConnexionCtrl', function($scope, $state, $ionicPlatform) {
   $scope.login = function(){
     $state.go('app.acceuil');
   }

   $scope.inscription = function(){
        $state.go('inscription');
    }
     
});