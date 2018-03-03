angular.module('starter.services', ['ngCordova'])

  .factory('SirinDataService', function($cordovaSQLite, $ionicPlatform, $http) {
   
    var db, dbName = "sirin.db";
 
    /*function useWebSql() {
      db = window.openDatabase(dbName, "1.0", "Note database", 200000)
      console.info('Using webSql');
      console.log('Using webSql');
    }*/
 
    function useSqlLite() {
        //db = $cordovaSQLite.openDB({name: dbName, location : 1});
        db = $cordovaSQLite.openDB({name: dbName, bgType : 1});
        console.info('Using SQLITE');
        console.log('Using SQLITE');
    }
 


  function initDatabase(){

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS PAYS (id integer primary key, nom_fr, nom_en, code_tel, sigle)')
        .then(function(res){
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS FONCTIONS (id integer primary key, nom_fr, nom_en)')
        .then(function(res){
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS INSCRIPTION (id integer primary key, username, email, telephone, password, ville, pays integer, fonction integer, monuserid integer , FOREIGN KEY(pays) REFERENCES PAYS(id), FOREIGN KEY(fonction) REFERENCES PAYS(FONCTIONS))')
        .then(function(res){
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS GROUPES (id integer primary key, nom_fr, nom_en, image, description_fr, description_en)')
        .then(function(res){
      }, onErrorQuery)
                                               
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS SOUS_GROUPES (id integer primary key, nom_fr, nom_en, image, description_fr, description_en, groupes integer, FOREIGN KEY(groupes) REFERENCES GROUPES(id) )')
        .then(function(res){
      }, onErrorQuery)                                                                 

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS QUESTIONS (id integer primary key, titre_fr, titre_en, type_reponse, interval, type_debut)')
        .then(function(res){
      }, onErrorQuery)
                                                                        
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS REPONSES (id integer primary key, titre_fr, titre_en, questions integer, questions_next integer, FOREIGN KEY(questions) REFERENCES QUESTIONS(id), FOREIGN KEY(questions_next) REFERENCES QUESTIONS(id) )')
       .then(function(res){
      }, onErrorQuery)
                                                                                
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS TYPE_OBSERVATIONS (id integer primary key, nom_fr, nom_en, image, type_question, questions integer, FOREIGN KEY(questions) REFERENCES QUESTIONS(id) )')
       .then(function(res){
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS ESPECES (id integer primary key, nom_fr, nom_en, image, description_fr, description_en, sous_groupes integer, questions_animal, questions_menaces, questions_signe, questions_alimentation, FOREIGN KEY(sous_groupes) REFERENCES SOUS_GROUPES(id) )')
        .then(function(res){
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS PROJET (id integer primary key, nom, lieu, public, pays integer, utilisateurs integer, FOREIGN KEY(pays) REFERENCES PAYS(id), FOREIGN KEY(utilisateurs) REFERENCES UTILISATEURS(id))')
        .then(function(res){
      }, onErrorQuery)                                                                        
     
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS UTILISATEURS (id integer primary key, username, email, password, ville, telephone, pays integer, fonctions integer, projet integer, monuserid integer, FOREIGN KEY(pays) REFERENCES PAYS(id), FOREIGN KEY(fonctions) REFERENCES FONCTIONS(id), FOREIGN KEY(projet) REFERENCES PROJET(id) )')
        .then(function(res){
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS OBSERVATIONS (id integer primary key,  dateo , coordX, coordY,  img1File, img2File, img3File, img4File, note, etat, typeObservations integer, utilisateur integer, projet integer, groupe integer, sousgroupe integer, espece integer, FOREIGN KEY(typeObservations) REFERENCES TYPE_OBSERVATIONS(id), FOREIGN KEY(espece) REFERENCES ESPECES(id), FOREIGN KEY(sousgroupe) REFERENCES SOUS_GROUPES(id), FOREIGN KEY(groupe) REFERENCES GROUPES(id), FOREIGN KEY(utilisateur) REFERENCES UTILISATEURS(id), FOREIGN KEY(projet) REFERENCES PROJET(id) )')
       .then(function(res){                                                 
      }, onErrorQuery)

      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS RESULTATS (id integer primary key, contenu, questions integer, observations integer, etat, FOREIGN KEY(questions) REFERENCES QUESTIONS(id), FOREIGN KEY(observations) REFERENCES OBSERVATIONS(id))')
        .then(function(res){
      }, onErrorQuery)
    
    }


 
    $ionicPlatform.ready(function () {
      if(window.cordova){
        useSqlLite()
      } else {
        useWebSql()
      }
       
      initDatabase()
    })
 
    function onErrorQuery(err){
      //console.error(err)
    }
 

    return {

        // pays Local
          createPays: function (pays) {
            return $cordovaSQLite.execute(db, 'INSERT INTO PAYS (nom_fr, nom_en, code_tel, sigle) VALUES(?, ?, ?, ?)', [pays.nom_fr, pays.nom_en, pays.code_tel, pays.sigle])
          },

          updatePays: function(pays){
            return $cordovaSQLite.execute(db, 'UPDATE PAYS set nom_fr = ?, nom_en = ?, code_tel = ?, sigle = ? where id = ?', [pays.nom_fr, pays.nom_en, pays.code_tel, pays.sigle, pays.id])
          },

          deletePays: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM PAYS where id = ?', [id])
          },

          deleteAllPays: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM PAYS')
          },

          getAllPays: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM PAYS').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin pays

          // debut foncion

          createFonctions: function (fonctions) {
            return $cordovaSQLite.execute(db, 'INSERT INTO FONCTIONS (nom_fr, nom_en) VALUES(?, ?)', [fonctions.nom_fr, fonctions.nom_en])
          },

          updateFonctions: function(fonctions){
            return $cordovaSQLite.execute(db, 'UPDATE FONCTIONS set nom_fr = ?, nom_en = ? where id = ?', [fonctions.nom_fr, fonctions.nom_en, fonctions.id])
          },

          deleteFonctions: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM FONCTIONS where id = ?', [id])
          },

          deleteAllFonctions: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM FONCTIONS')
          },

          getAllFonctions: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM FONCTIONS').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // debut Inscription

          createInscription: function (inscription) {
            return $cordovaSQLite.execute(db, 'INSERT INTO INSCRIPTION (username, email, telephone, password, ville, pays, fonction, monuserid) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [inscription.username, inscription.email, inscription.telephone, inscription.password, inscription.ville, inscription.pays, inscription.fonction, inscription.monuserid])
          },

          updateInscription: function(inscription){
            return $cordovaSQLite.execute(db, 'UPDATE INSCRIPTION set username = ?, email = ?, telephone = ?, password = ?, ville = ?, pays = ?, fonction = ?, monuserid = ? where id = ?', [inscription.username, inscription.email, inscription.telephone, inscription.password, inscription.ville, inscription.pays, inscription.fonction, inscription.monuserid , inscription.id])
          },

          deleteInscription: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM INSCRIPTION where id = ?', [id])
          },

          deleteAllInscription: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM INSCRIPTION')
          },

          getAllInscription: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM INSCRIPTION').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin fonction
          
          // debut groupe

          createGroupes: function (groupes) {
            return $cordovaSQLite.execute(db, 'INSERT INTO GROUPES ( nom_fr, nom_en, image, description_fr, description_en) VALUES(?, ?, ?, ?, ?)', [groupes.nom_fr, groupes.nom_en, groupes.image, groupes.description_fr, groupes.description_en])
          },

          updateGroupes: function(groupes){
            return $cordovaSQLite.execute(db, 'UPDATE GROUPES set nom_fr = ?, nom_en = ?, image = ?, description_fr = ?, description_en = ? where id = ?', [groupes.nom_fr, groupes.nom_en, groupes.image, groupes.description_fr, groupes.description_en, groupes.id])
          },

          deleteGroupes: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM GROUPES where id = ?', [id])
          },

          deleteAllGroupes: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM GROUPES')
          },

          getAllGroupes: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM GROUPES').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin groupe

          // debut SOUS_GROUPES

          createSous_groupes: function (sous_groupes) {
            return $cordovaSQLite.execute(db, 'INSERT INTO SOUS_GROUPES ( nom_fr, nom_en, image, description_fr, description_en, groupes) VALUES(?, ?, ?, ?, ?, ?)', [sous_groupes.nom_fr, sous_groupes.nom_en, sous_groupes.image, sous_groupes.description_fr, sous_groupes.description_en, sous_groupes.groupes])
          },

          updateSous_groupes: function(sous_groupes){
            return $cordovaSQLite.execute(db, 'UPDATE SOUS_GROUPES set nom_fr = ?, nom_en = ?, image = ?, description_fr = ?, description_en = ?, groupes = ? where id = ?', [sous_groupes.nom_fr, sous_groupes.nom_en, sous_groupes.image, sous_groupes.description_fr, sous_groupes.description_en, sous_groupes.groupes, sous_groupes.id])
          },

          deleteSous_groupes: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM SOUS_GROUPES where id = ?', [id])
          },

           deleteAllSous_groupes: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM SOUS_GROUPES')
           },

          getAllSous_groupes: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM SOUS_GROUPES').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          getAllSous_groupesByGroupeId: function(id, callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM SOUS_GROUPES where groupes = ?', [id]).then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin SOUS_GROUPES

          // debut QUESTIONS

          createQuestions: function (question) {
            return $cordovaSQLite.execute(db, 'INSERT INTO QUESTIONS ( titre_fr, titre_en, type_reponse, interval, type_debut) VALUES(?, ?, ?, ?, ?)', [question.titre_fr, question.titre_en, question.type_reponse, question.interval, question.type_debut])
          },

          updateQuestions: function(question){
            return $cordovaSQLite.execute(db, 'UPDATE QUESTIONS set titre_fr = ?, titre_en = ?, type_reponse = ?, interval = ?, type_debut = ? where id = ?', [question.titre_fr, question.titre_en, question.type_reponse, question.interval, question.type_debut, questions.id])
          },

          deleteQuestions: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM QUESTIONS where id = ?', [id])
          },
          
          deleteAllQuestions: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM QUESTIONS')
          },

          getQuestionById: function(id, callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM QUESTIONS where id = ?', [id]).then(function (results) {
                console.log("la valeur de l id " + results.rows.item(0));
                callback(results.rows.item(0))
              })
            })
          },

          getAllQuestions: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM QUESTIONS').then(function (results) {
                var data = [];
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin QUESTIONS

          // debut REPONSES

          createReponses: function (reponse) {
            return $cordovaSQLite.execute(db, 'INSERT INTO REPONSES ( titre_fr, titre_en, questions, questions_next) VALUES(?, ?, ?, ?)', [reponse.titre_fr, reponse.titre_en, reponse.questions, reponse.questions_next])
          },

          updateReponses: function(reponse){
            return $cordovaSQLite.execute(db, 'UPDATE REPONSES set titre_fr = ?, titre_en = ?, questions = ?, questions_next = ? where id = ?', [reponse.titre_fr, reponse.titre_en, reponse.questions, reponse.questions_next, reponse.id])
          },

          deleteReponses: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM REPONSES where id = ?', [id])
          },

          deleteAllReponses: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM REPONSES')
          },

          getAllReponses: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM REPONSES').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          getAllReponsesByQuestionId: function(id,callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM REPONSES where questions = ?', [id]).then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },


          // fin REPONSES

          // debut TYPE_OBSERVATIONS

          createtypeObservations: function (typeObservations) {
            return $cordovaSQLite.execute(db, 'INSERT INTO TYPE_OBSERVATIONS ( nom_fr, nom_en, image, type_question) VALUES(?, ?, ?, ?)', [typeObservations.nom_fr, typeObservations.nom_en, typeObservations.image, typeObservations.type_question])
          },

          updatetypeObservations: function(typeObservations){
            return $cordovaSQLite.execute(db, 'UPDATE TYPE_OBSERVATIONS set nom_fr = ?, nom_en = ?, image = ?, type_question = ? where id = ?', [typeObservations.nom_fr, typeObservations.nom_en, typeObservations.image, typeObservations.type_question, typeObservations.id])
          },

          deletetypeObservations: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM TYPE_OBSERVATIONS where id = ?', [id])
          },

          deleteAllTypeObservations: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM TYPE_OBSERVATIONS')
          },

          getTypeObservationsById: function(id, callback){
            console.log(id);
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM TYPE_OBSERVATIONS where id = ?', [id]).then(function (results) {
                callback(results.rows.item(0))
              })
            })
          },

          getAlltypeObservations: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM TYPE_OBSERVATIONS').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin TYPE_OBSERVATIONS


          // debut ESPECES

          createEspeces: function (especes) {
            return $cordovaSQLite.execute(db, 'INSERT INTO ESPECES (nom_fr, nom_en, image, description_fr, description_en, sous_groupes, questions_animal, questions_menaces, questions_signe, questions_alimentation) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [especes.nom_fr, especes.nom_en, especes.image, especes.description_fr, especes.description_en, especes.sous_groupes, especes.questions_animal, especes.questions_menaces, especes.questions_signe, especes.questions_alimentation])
          },

          updateEspeces: function(especes){
            return $cordovaSQLite.execute(db, 'UPDATE ESPECES set nom_fr = ?, nom_en = ?, image = ?, description_fr = ?, description_en = ?, sous_groupes = ?, questions_animal = ?, questions_menaces = ?, questions_signe = ?, questions_alimentation = ? where id = ?', [especes.nom_fr, especes.nom_en, especes.image, especes.description_fr, especes.description_en, especes.sous_groupes, especes.questions_animal, especes.questions_menaces, especes.questions_signe, especes.questions_alimentation, especes.id])
          },

          deleteEspeces: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM ESPECES where id = ?', [id])
          },

          deleteAllEspeces: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM ESPECES')
          },

          getAllEspeces: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM ESPECES').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          getAllEspecesBySousgroupeId: function(id, callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM ESPECES where sous_groupes = ?', [id]).then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },
         
          // fin ESPECES

          // debut PROJET

          createProjets: function (projets) {
            return $cordovaSQLite.execute(db, 'INSERT INTO PROJET (nom, lieu, public, pays, utilisateurs) VALUES(?, ?, ?, ?, ?)', [projets.nom, projets.lieu, projets.public, projets.pays, projets.utilisateurs])
          },

          updateProjets: function(especes){
            return $cordovaSQLite.execute(db, 'UPDATE PROJET set nom = ?, lieu = ?, public = ?, pays = ?, utilisateurs = ? where id = ?', [projets.nom, projets.lieu, projets.public, projets.pays, projets.utilisateurs, projets.id])
          },

          deleteProjets: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM PROJET where id = ?', [id])
          },

          deleteAllProjets: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM PROJET')
          },

          getAllProjets: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM PROJET').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin PROJET

          // debut OBSERVATIONS

          createObservations: function (observations){
            return $cordovaSQLite.execute(db, 'INSERT INTO OBSERVATIONS (dateo , coordX, coordY,  img1File, img2File, img3File, img4File, note, etat, typeObservations, utilisateur, projet, groupe, sousgroupe, espece) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [observations.dateo , observations.coordX, observations.coordY,  observations.img1File, observations.img2File, observations.img3File, observations.img4File, observations.note, observations.etat, observations.typeObservations, observations.utilisateur, observations.projet, observations.groupe, observations.sousgroupe, observations.espece])
          },

          updateObservations: function(observations){
            return $cordovaSQLite.execute(db, 'UPDATE OBSERVATIONS set observations.dateo = ? , observations.coordX = ?, observations.coordY = ?,  observations.img1File = ?, observations.img2File = ?, observations.img3File = ?, observations.img4File = ?, observations.note = ?, observations.etat = ?, observations.typeObservations = ?, observations.utilisateur = ?, observations.projet = ?, observations.groupe = ?, observations.sousgroupe = ?, observations.espece = ?  where id = ?', [observations.dateo , observations.coordX, observations.coordY,  observations.img1File, observations.img2File, observations.img3File, observations.img4File, observations.note, observations.etat, observations.typeObservations, observations.utilisateur, observations.projet, observations.groupe, observations.sousgroupe, observations.espece, observations.id])
          },

          deleteObservations: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM OBSERVATIONS where id = ?', [id])
          },

          deleteAllObservations: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM OBSERVATIONS')
          },

          

          getAllObservations: function(callback){
            $ionicPlatform.ready(function () {
              console.log("c corrects");
              $cordovaSQLite.execute(db, 'SELECT * FROM OBSERVATIONS').then(function (results) {
                var data = []
                console.log(results);
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },




          getAllObservationByUserAndProjet: function(iduser, idprojet, callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM OBSERVATIONS where (utilisateur = ?) and (projet = ?)', [iduser, idprojet]).then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin OBSERVATIONS

          // debut UTILISATEURS

          createUtilisateurs: function (utilisateurs) {
            try{
              return $cordovaSQLite.execute(db, 'INSERT INTO UTILISATEURS (username, email, password, ville, telephone, pays, fonctions, projet, monuserid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [utilisateurs.username, utilisateurs.email, utilisateurs.password, utilisateurs.ville, utilisateurs.telephone, utilisateurs.pays, utilisateurs.fonctions, utilisateurs.projet, utilisateurs.monuserid])
            }catch(err){
              console.log("errrrrrrrrrrrrrr " + err);
            }
            
          },

          updateUtilisateurs: function(utilisateurs){
            return $cordovaSQLite.execute(db, 'UPDATE UTILISATEURS set username = ?, email = ?, password = ?, ville = ?, telephone = ?, pays = ?, fonctions = ?, projet = ?, monuserid = ?  where id = ?', [utilisateurs.username, utilisateurs.email, utilisateurs.password, utilisateurs.ville, utilisateurs.telephone, utilisateurs.pays, utilisateurs.fonctions, utilisateurs.projet, utilisateurs.monuserid, utilisateurs.id])
          },

          deleteUtilisateurs: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM UTILISATEURS where id = ?', [id])
          },

          deleteAllUtilisateurs: function(){
            return $cordovaSQLite.execute(db, 'DELETE FROM UTILISATEURS')
          },

          findUtilisateursByLoginAndPassword: function(utilisateur, callback){
            
         
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM INSCRIPTION where email = ? and password = ?',[utilisateur.login, utilisateur.password]).then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          getAllUtilisateurs: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM UTILISATEURS').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin UTILISATEURS

          // debut RESULTATS

          createResultats: function (resultats) {
            return $cordovaSQLite.execute(db, 'INSERT INTO RESULTATS (contenu, questions, observations, etat) VALUES(?, ?, ?, ?)', [resultats.contenu, resultats.questions, resultats.observations, resultats.etat])
          },

          updateResultats: function(resultats){
            return $cordovaSQLite.execute(db, 'UPDATE RESULTATS set contenu = ?, questions = ?, etat = ?, etat = ?  where id = ?', [resultats.contenu, resultats.questions, resultats.observations, resultats.etat, resultats.id])
          },

          deleteResultats: function(id){
            return $cordovaSQLite.execute(db, 'DELETE FROM RESULTATS where id = ?', [id])
          },

          getAllResultats: function(callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM RESULTATS').then(function (results) {
                var data = []
     
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
     
                callback(data)
              }, onErrorQuery)
            })
          },

          // fin RESULTATS

          getPaysById: function(id, callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM PAYS where id = ?', [id]).then(function (results) {
                callback(results.rows.item(0))
              })
            })
          },

          

          findReponseByQuestionId: function (id) {

                var url = 'http://siren.ammco.org/web/fr/api/reponsesquestions/'+ id;
                return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        },
                          function (errResponse) {
                             console.error('Error while find reponse');
                             return $q.reject(errResponse);
                    });
          },


          getAllReponseByIdQuestion: function(id, callback){
            $ionicPlatform.ready(function () {
              $cordovaSQLite.execute(db, 'SELECT * FROM REPONSE where question_id = ?', [id]).then(function (results) {
                var data = []
                for (i = 0, max = results.rows.length; i < max; i++) {
                  data.push(results.rows.item(i))
                }
                callback(data)
              }, onErrorQuery)
            })
          }

    }

  })