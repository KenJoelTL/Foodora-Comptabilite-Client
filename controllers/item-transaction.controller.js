//var host = "https://tomcat.dept-info.crosemont.quebec/Foodora-Comptabilite-API/comptabilite/itemtransaction/"; //pour le live

var myApp = angular.module("myApp");
//Définition d'un controleur pour le module myApp
myApp.controller('ItemTransactionCtrl', ['$scope', '$http', function ($scope, $http) {
        //console.log("Coucou du controleur !");
        var host = "http://localhost:8080/Foodora-Comptabilite-API/comptabilite/itemtransaction/"; //pour le test en localhost.

        //fonction pour reinitialiser l'itemTransaction sélectionnée
        $scope.deselectionnerItemTransaction = function () {
            $scope.itemTransaction = null;
        };

        var deselectionnerItemTransaction = $scope.deselectionnerItemTransaction;

        //fonction pour rafraichir la page.
        var rafraichir = function () {
            //action lorsque requete get /itemTransaction
            $http.get(host).then(function (response) {
                //console.log("J'ai reçu les données que j'ai demandées");
                $scope.listeItemTransactions = response.data;
                deselectionnerItemTransaction();
            });
        };

        rafraichir(); // la fonction sera appelée lors du démmarage de l'app

        //fonction pour ajouter un itemTransaction à la base de données
        $scope.ajouterItemTransaction = function () {
            //console.log($scope.itemTransaction); //itemTransaction à ajouter à la bd
            $http.post(host, $scope.itemTransaction).then(function (response) {
                console.log(response.data); //itemTransaction ajoutée à la bd

                rafraichir();
            });
        };

        //fonction pour supprimer un itemTransaction de la bd
        $scope.supprimerItemTransaction = function (id) {
            //console.log(id);
            $http.delete(host+id).then(function (response) {
                rafraichir();
            });
        };

        //fonction pour chercher un itemTransaction de la bd et le selectionner(mettre dans le formulaire)
        $scope.chercherItemTransaction = function (id) {
            //console.log(id);
            deselectionnerItemTransaction();
            $http.get(host+id).then(function (response) {
                $scope.itemTransaction = response.data;
            });
        };

        //fonction pour modifier l'itemTransaction sélectionnée (dans le formulaire)
        $scope.modifierItemTransaction = function () {
            //console.log($scope.itemTransaction.id);
            $http.put(host+$scope.itemTransaction.id, $scope.itemTransaction).then(function (response) {
                //console.log(response.data);
                rafraichir();
            });
        };


    }]);
