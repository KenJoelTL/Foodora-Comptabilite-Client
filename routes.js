var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./templates/transaction.template.html",
        controller : "TransactionCtrl"
    })
    .when("/item-transaction", {
        templateUrl : "./templates/item-transaction.template.html",
        controller : "ItemTransactionCtrl"
    })
    .when("/tomato", {
        template : "<h1>Tomato</h1><p>Tomatoes contain around 95% water.</p>"
    })
    .otherwise({
        templateUrl : "./templates/transaction.template.html",
        controller : "TransactionCtrl"
    });
});
