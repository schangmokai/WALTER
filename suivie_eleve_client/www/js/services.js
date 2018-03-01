angular.module('starter.services', [])

.factory("heureService", ["$http", "$q","$config",
    function ($http, $q, $config) {

       
        var personneConnecte={};

        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
         };
         
        return { 
            

            getPersonneConnecte: function (){
                return personneConnecte;
            },
            
            setPersonneConnecte: function (personne){
                personneConnecte = personne;
            },

            recherche: function (appel, codeClasse) {
                return $http({
                    method: 'POST',
                    url:  $config.URI.recherche  + codeClasse,
                    data: appel,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while finding the client");
                            return $q.reject(errResponse);
                });
            },

             findProgramme: function (appel, codeClasse) {
                return $http({
                    method: 'POST',  
                    url: $config.URI.findprogrammebyclasse + codeClasse,
                    data: appel,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while finding the client");
                            return $q.reject(errResponse);
                });
            },

            saveNotification: function (notifications) {
                return $http({
                    method: 'POST', 
                    url: $config.URI.savenotification,
                    data: notifications,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while finding the client");
                            return $q.reject(errResponse);
                });
            },

            saveNote: function (note) {
                return $http({
                    method: 'POST', 
                    url: $config.URI.savenote,
                    data: note,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while finding the client");
                            return $q.reject(errResponse);
                });
            },

             getInscriptionByCode: function (codebare) {

                var url = $config.URI.findbycodebarre + codebare;
                return $http.get(url)
                        .then(function (response) {
                            console.log(response);
                            return response.data;
                        },
                          function (errResponse) {
                             console.error('Error while listing Clients');
                             return $q.reject(errResponse);
                    });
            },



            getInscriptionByClasseCode: function (code) {

                var url = $config.URI.findbyclassebycode  + code;
                return $http.get(url)
                        .then(function (response) {
                            console.log(response);
                            return response.data;
                        },
                          function (errResponse) {
                             console.error('Error while listing Clients');
                             return $q.reject(errResponse);
                     });
            },

            findEnseignantByLoginAndPassword: function (enseignant) {
                return $http({
                    method: 'POST',
                    url: $config.URI.listesByLoginAndPassword,
                    data: enseignant,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while finding the client");
                            return $q.reject(errResponse);
                });
            },


            addAppel: function (appel) {
                return $http({
                    method: 'POST', 
                    url: $config.URI.saveAppel ,
                    data: appel,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while finding the appel");
                            return $q.reject(errResponse);
                });
            },


            getHeures: function () {
                var url = $config.URI.listesheures;
                return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        },
                          function (errResponse) {
                             console.error('Error while listing Clients');
                             return $q.reject(errResponse);
                    });
            },
            
            addHeure: function (heure) {
                return $http.post($config.URI.ajouterheure , heure, config)
                        .then(
                                function (response) {
                                    return response.data;
                                },
                                function (errResponse) {
                                    console.error('Error while creating heure');
                                    return $q.reject(errResponse);
                                }
                        );
            },
            
            updateHeure: function (id, heure) {
                return $http({
                    method: 'PUT',
                    url: $config.URI.updateheure + id,
                    data: heure,
                 }, config)
                        .then(function (response) {
                            return response.data;
                        }, function (errResponse) {
                            console.error("Error while updating the client");
                            return $q.reject(errResponse);
                });
            },
            
            deleteHeure: function (id) {
                
                return $http.get( $config.URI.suprimerheure + id, config)
                then(function (response) {
                    return response.data;
                },
                        function (errResponse) {
                            console.error("Error while getting a spcific customer by id");
                            return $q.reject(errResponse);
                        }
                );
            },
            
            
        };
    }]);