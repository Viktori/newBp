require('angular');
require('angular-route');

var app = angular.module('app', ['ngRoute']);

// Just for test
app.controller('MainController', ($scope) => {
	$scope.message = 'Angular Works!';
});

// Routing
app.config(($routeProvider) => {
    $routeProvider
	.when('/', {
        templateUrl : './home.html'
    })
    .when('/short-article', {
        templateUrl : './short-article.html'
    })
    .when('/long-article', {
        templateUrl : './long-article.html'
    });
});