// Ionic Starter App
// //ip adresse 192.168.0.2
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.constant'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function($cordovaSms) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
 $stateProvider


    .state('connexion', {
      cache: true,
      url: '/connexion',
      templateUrl: 'templates/connexion.html',
      controller: 'ConnexionCtrl'
    })

    .state('note', {
      cache: true,
      url: '/note/:id/:code/:intitule/:classe',
      templateUrl: 'templates/note.html',
      controller: 'NoteCtrl'
    })

    .state('listescours', {
      cache: true,
      url: '/listescours/:id/:code/:codeclasse',
      templateUrl: 'templates/listescours.html',
      controller: 'ListescoursCtrl'
    })

    .state('listeseleves', {
      cache: true,
      url: '/listeseleves/:id/:intitule/:cours/:code/:codeclasse/:codeCours',
      templateUrl: 'templates/listeseleves.html',
      controller: 'ListeseleveCtrl'
    })

    .state('admineleve', {
      cache: true,
      url: '/admineleve/:id/:intitule/:cours/:code/:codeclasse/:codeCours',
      templateUrl: 'templates/admineleve.html',
      controller: 'admineleveCtrl'
    })

    .state('avisauxparent', {
      cache: true,
      url: '/avisauxparent',
      templateUrl: 'templates/avisauxparent.html',
      controller: 'admineleveCtrl'
    })

    .state('reuinionsgenerale', {
      cache: true,
      url: '/reuinionsgenerale',
      templateUrl: 'templates/reuinionsgenerale.html',
      controller: 'admineleveCtrl'
    })

    .state('etatseleves', {
      cache: true,
      url: '/etatseleves/:id/:intitule/:cours/:code/:codeclasse',
      templateUrl: 'templates/etatseleve.html',
      controller: 'etatseleveCtrl'
    })

    .state('listesclasses', {
      cache: true,
      url: '/listesclasses',
      templateUrl: 'templates/listesclasses.html',
      controller: 'ListesclassesCtrl'
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/connexion');

});