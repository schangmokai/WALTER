// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'pascalprecht.translate','starter.controllers' , 'starter.services', 'ngMap'])

.run(function($ionicPlatform, $cordovaSQLite,  $ionicPopup, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    /*if(window.localStorage.getItem("login")===null && window.localStorage.getItem("password")==null){
        $state.go('app.login');
    }else{
        $state.go('app.acceuil');
    }*/

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(window.Connection){
        if(navigator.Connection.type == Connection.NONE){

              $ionicPopup.confirm({
                  title: "Internet Disconnected",
                  content: "the Internet is Disconnected on you divice."
              }).then(function(result){
                   if(!result){
                       ionic.Platform.exitApp();
                   }
              });

        }
    }
  });

  $rootScope.userconnecte = {};
})


.config(function($stateProvider, $urlRouterProvider,$translateProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('connexion', {
    cache: false,
    url: '/connexion',
    templateUrl: 'templates/connexion.html',
    controller: 'ConnexionCtrl'
  })

  .state('sirin', {
    cache: false,
    url: '/sirin/:question/:reponse',
    templateUrl: 'templates/sirin.html',
    controller: 'SirinCtrl'
  })


  .state('inscription', {
    cache: false,
    url: '/inscription',
    templateUrl: 'templates/inscription.html',
    controller: 'InscriptionCtrl'
  })

  .state('app.obstacle', {
    cache: false,
    url: '/obstacle',
    views: {
      'menuContent': {
        templateUrl: 'templates/obstacle.html',
        controller: 'obstacleCtrl'
      }
    }
  })

 .state('app.groupe', {
    cache: false,
    url: '/groupe',
    views: {
      'menuContent': {
        templateUrl: 'templates/groupe.html',
        controller: 'GroupeCtrl'
      }
    }
  })

 .state('app.nombrepetit', {
    cache: false,
    url: '/nombrepetit/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/nombrepetit.html',
        controller: 'NombrepetitCtrl'
      }
    }
  })

 .state('app.ouestanimal', {
    cache: false,
    url: '/ouestanimal/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/ouestanimal.html',
        controller: 'OuestanimalCtrl'
      }
    }
  })

 .state('app.espece', {
    cache: false,
    url: '/espece',
    views: {
      'menuContent': {
        templateUrl: 'templates/espece.html',
        controller: 'EspeceCtrl'
      }
    }
  })

 .state('app.photos', {
    cache: false,
    url: '/photos/:question/:reponse',
    views: {
      'menuContent': {
        templateUrl: 'templates/photos.html',
        controller: 'PhotosCtrl'
      }
    }
  })

 .state('app.description', {
    cache: false,
    url: '/description/:question/:reponse',
    views: {
      'menuContent': {
        templateUrl: 'templates/description.html',
        controller: 'DescriptionCtrl'
      }
    }
  })

 .state('app.sous_espece', {
    cache: false,
    url: '/sous_espece',
    views: {
      'menuContent': {
        templateUrl: 'templates/sous_espece.html',
        controller: 'Sous_especeCtrl'
      }
    }
  })

  .state('app.etineraire', {
    cache: false,
    url: '/etineraire/:depart/:arrive',
    views: {
      'menuContent': {
        templateUrl: 'templates/etineraire.html',
        controller: 'etineraireCtrl'
      }
    }
  })

  .state('app.connexion', {
      cache: false,
      url: '/connexion',
      views: {
        'menuContent': {
          templateUrl: 'templates/connexion.html',
          controller: 'ConnexionCtrl'
        }
      }
    })

  .state('app.browse', {
      cache: false,
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.acceuil', {
      cache: false,
      url: '/acceuil',
      views: {
        'menuContent': {
          templateUrl: 'templates/acceuil.html',
          controller: 'AcceuilCtrl'
        }
      }
    })  

    .state('app.profils', {
      cache: false,
      url: '/profils',
      views: {
        'menuContent': {
          templateUrl: 'templates/profils.html',
          controller: 'ProfilsCtrl'
        }
      }
    })  

   .state('app.synchronisation', {
      cache: false,
      url: '/synchronisation',
      views: {
        'menuContent': {
          templateUrl: 'templates/synchronisation.html',
          controller: 'SynchronisationCtrl'
        }
      }
    })  


    

    .state('app.langue', {
      cache: false,
      url: '/langue',
      views: {
        'menuContent': {
          templateUrl: 'templates/langue.html',
          controller: 'LangueCtrl'
        }
      }
    })

    .state('app.projet', {
      cache: false,
      url: '/projet',
      views: {
        'menuContent': {
           templateUrl: 'templates/projet.html',
          controller: 'ProjetCtrl'
        }
      }
    })

    .state('app.mesprojet', {
      cache: false,
      url: '/mesprojet',
      views: {
        'menuContent': {
          templateUrl: 'templates/mesprojet.html',
          controller: 'MesprojetCtrl'
        }
      }
    })

    .state('app.commentaire', {
      cache: false,
      url: '/commentaire',
      views: {
        'menuContent': {
          templateUrl: 'templates/commentaire.html',
          controller: 'CommentaireCtrl'
        }
      }
    })

  .state('app.carte', {
      cache: false,
      url: '/carte',
      views: {
        'menuContent': {
          templateUrl: 'templates/carte.html',
          controller: 'CarteCtrl'
        }
      }
    })

    .state('app.observation', {
      cache: false,
      url: '/observation',
      views: {
        'menuContent': {
          templateUrl: 'templates/observation.html',
          controller: 'ObservationCtrl'
        }
      }
    })

    .state('app.mesobservation', {
      cache: false,
      url: '/mesobservation',
      views: {
        'menuContent': {
          templateUrl: 'templates/mesobservation.html',
          controller: 'MesobservationCtrl'
        }
      }
    })

    .state('app.notification', {
      cache: false,
      url: '/notification',
      views: {
        'menuContent': {
          templateUrl: 'templates/notification.html',
          controller: 'NotificationCtrl'
        }
      }
    })

    

    .state('app.playlists', {
      cache: false,
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    cache: false,
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/connexion');  
   // $urlRouterProvider.otherwise('app/photos');  


   $translateProvider.translations('en', {
        'BIENVENUS': 'Welcome to Siren',    
        'ACCEUIL': 'Home',
        'AJOUTEROBSERVATION': 'Add an Observation',
        'MESOBSERVATION': 'My Observations',
        'MESNOTIFICATION': 'My notifications',
        'OBSERVATION': 'Observation',
        'SUIVANT': 'Next',
        'SELECTIONESPECE': 'Select the species',
        'SELECTIONEGROUPE': 'Select the Group',
        'INSCRIPTION': 'Sign up',
        'INFOSC': 'Account informations',
        'INFOSP': 'Personal informations',
        'FONCTIONS':'Fonction',
        'INFOS':'Your registration has been taken into account',
        'CONNEXION': 'Sign in',
        'INSCRIRE': 'Register',
        'PROFIL': 'My Profile',
        'LANGUE': 'Language',
        'MESPROJETS': 'My projets',
        'CHANGEPROJET': 'Change projets',
        'COMMANTAIRE': 'Leave a comment',
        'ALLEZSURCARTE': 'Go to the map',
        'DECONNEXION':'Log out',
        'SUIVANT': 'Next',
        'NOTIFICATION':'Notifications',
        'MESIMAGES': 'My Images',
        'RECAPITULATIF':'Summary of your obseravtion',
        'SOUSGROUPES':'Select the Sub Group',
        'SYNCRONISATION':'Syncronise data'
        
      });

      $translateProvider.translations('fr', {
        'BIENVENUS': 'Bienvenue sur Siren',
        'ACCEUIL': 'Accueil',
        'AJOUTEROBSERVATION': 'Ajouter une Observation',
        'MESOBSERVATION': 'Mes Observations',
        'MESNOTIFICATION': 'Mes notifications',
        'OBSERVATION': 'Observation',
        'SUIVANT': 'Suivant',
        'SELECTIONESPECE': 'Sélectionner l\'espece',
        'SELECTIONEGROUPE': 'Sélectionner le groupe',
        'INSCRIPTION': 'Inscription',
        'INFOSC' : 'Informations du compte',
        'INFOSP' : 'Informations personnelles',
        'FONCTIONS':'Fonction',
        'INFOS' : 'Votre inscription à bien été pris en compte',
        'CONNEXION': 'Se connecter',
        'INSCRIRE': 'S\'inscrire',
        'PROFIL': 'Mon Profil',
        'LANGUE': 'Langue',
        'MESPROJETS': 'Mes projets',
        'CHANGEPROJET': 'Changer projets',
        'COMMANTAIRE': 'Laisser un commentaire',
        'ALLEZSURCARTE': 'Allez sur la carte',
        'DECONNEXION':'Déconnexion',
        'SUIVANT': 'Suivant',
        'NOTIFICATION':'Notifications',
        'MESIMAGES': 'Mes Images',
        'RECAPITULATIF':'Récapitulatif de votre observation',
        'SOUSGROUPES':'Sélectionner le sous-groupe',
        'SYNCRONISATION':'Syncronisez les données'
        
      });

      $translateProvider.preferredLanguage('fr');

});
