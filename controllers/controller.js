var host = "https://tomcat.dept-info.crosemont.quebec/Foodora-Comptabilite-API/comptabilite/transaction"; //pour le live
//var host = "http://localhost:8080"; //pour le test en localhost.
//var host = "http://localhost:8080/Foodora-Compatibilite-API/compatibilite/transaction/";
var myApp = angular.module('myApp', []);

//Définition d'un controleur pour le module myApp
myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
        //console.log("Coucou du controleur !");

        //fonction pour reinitialiser le contact sélectionné
        $scope.deselectionnerTransaction = function () {
            $scope.transaction = null;
        };

        var deselectionnerTransaction = $scope.deselectionnerTransaction;

        //fonction pour rafraichir la page.
        var rafraichir = function () {
            //action lorsque requete get /contactlist
            $http.get(host).then(function (response) {
                //console.log("J'ai reçu les données que j'ai demandées");
                $scope.listeTransactions = response.data;
                deselectionnerTransaction();
            });
        };

        rafraichir(); // la fonction sera appelée lors du démmarage de l'app

        //fonction pour ajouter un contact à la base de données
        $scope.ajouterTransaction = function () {
            //console.log($scope.contact); //contact à ajouter à la bd
            $http.post(host, $scope.transaction).then(function (response) {
                console.log(response.data); //contact ajouté à la bd
                
                rafraichir();
            });
        };

        //fonction pour supprimer un contact de la bd
        $scope.supprimerTransaction = function (id) {
            //console.log(id);
            $http.delete(host+id).then(function (response) {
                rafraichir();
            });
        };

        //fonction pour chercher un contact de la bd et le selectionner(mettre dans le formulaire)
        $scope.chercherTransaction = function (id) {
            //console.log(id);
            deselectionnerTransaction();
            $http.get(host+id).then(function (response) {
                $scope.transaction = response.data;
            });
        };

        //fonction pour modifier le contact sélectionné (dans le formulaire)
        $scope.modifierTransaction = function () {
            //console.log($scope.contact._id);
            $http.put(host+$scope.transaction.id, $scope.transaction).then(function (response) {
                //console.log(response.data);
                rafraichir();
            });
        };


    }]);
