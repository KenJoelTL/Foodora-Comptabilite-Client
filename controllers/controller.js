var host = "https://tomcat.dept-info.crosemont.quebec/Foodora-Comptabilite-API/comptabilite/transaction/"; //pour le live
//var host = "http://localhost:8080"; //pour le test en localhost.
//var host = "http://localhost:8080/Foodora-Compatibilite-API/compatibilite/transaction/";
var myApp = angular.module('myApp', []);

//Définition d'un controleur pour le module myApp
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
        //console.log("Coucou du controleur !");

        //fonction pour reinitialiser la transaction sélectionnée
        $scope.deselectionnerTransaction = function () {
            $scope.transaction = null;
        };

        var deselectionnerTransaction = $scope.deselectionnerTransaction;

        //fonction pour rafraichir la page.
        var rafraichir = function () {
            //action lorsque requete get /transaction
            $http.get(host).then(function (response) {
                //console.log("J'ai reçu les données que j'ai demandées");
                $scope.listeTransactions = response.data;
                deselectionnerTransaction();
            });
        };

        rafraichir(); // la fonction sera appelée lors du démmarage de l'app

        //fonction pour ajouter une transaction à la base de données
        $scope.ajouterTransaction = function () {
            //console.log($scope.transaction); //transaction à ajouter à la bd
            $http.post(host, $scope.transaction).then(function (response) {
                console.log(response.data); //transaction ajoutée à la bd

                rafraichir();
            });
        };

        //fonction pour supprimer une transaction de la bd
        $scope.supprimerTransaction = function (id) {
            //console.log(id);
            $http.delete(host+id).then(function (response) {
                rafraichir();
            });
        };

        //fonction pour chercher une transaction de la bd et le selectionner(mettre dans le formulaire)
        $scope.chercherTransaction = function (id) {
            //console.log(id);
            deselectionnerTransaction();
            $http.get(host+id).then(function (response) {
                $scope.transaction = response.data;
            });
        };

        //fonction pour modifier le transaction sélectionnée (dans le formulaire)
        $scope.modifierTransaction = function () {
            //console.log($scope.transaction.id);
            $http.put(host+$scope.transaction.id, $scope.transaction).then(function (response) {
                //console.log(response.data);
                rafraichir();
            });
        };


    }]);
