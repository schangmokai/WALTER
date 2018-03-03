angular.module('starter.services')

.factory('$parcours', function($ionicLoading){ 
	var parcours = [];
	var reponses = [];
	var coordonne = [];
	var utilisateurs = [];
	var photos = [];
	var description = [];
	var langue = [];
	var connecter=[];


   	return {
		
		getZozo(){
			return 12;
		},
		add:function(element){
			parcours.push(element);
		},

		setLangue: function(langues){
			langue.splice(0, 0, langues);
		},

		getLangue: function(){
			return langue[0];
		},

		addReponse: function(element){
            reponses.push(element);
		},
      
        getAllReponse:function(){
			return reponses;
		},

        addPhotos: function(element, index){
        	photos.splice(index, 0, element);
        },

        addConnecter: function(element, index){
        	connecter.splice(index, 0, element);
        },

        getConnecterById:function(id){
			return connecter[id];
		},

		removeConnecterIndex: function(index){
            connecter.splice(index, 1);
		},

        addDescription: function(element, index){
        	description.splice(index, 0, element);
        },

        getPhotosById:function(id){
			return photos[id];
		},

         getDescriptionById:function(id){
			return description[id];
		},

        addUtilisateur: function(element, index){
        	utilisateurs.splice(index, 0, element);
        },
		
		removeUtilisateurIndex: function(index){
            utilisateurs.splice(index, 1);
		},

        getUtilisateurById:function(id){
			return utilisateurs[id];
		},
        
        addCoordonne: function(element, index){
            coordonne.splice( index, 0, element );
        },
        removeCoordonneIndex: function(index){
            coordonne.splice(index, 1);
		},

        getCoordoneById:function(id){
			return coordonne[id];
		},

		addIndex: function(element, index){
			parcours.splice( index, 0, element );
		},
		removeIndex: function(index){
            parcours.splice(index, 1);
		},

        getById:function(id){
			return parcours[id];
		},

		getAll:function(){
			return parcours;
		},

		reset:function(){
			
			parcours = [];
			reponses = [];
			coordonne = [];
			photos = [];
			description = [];
		}
	}
})