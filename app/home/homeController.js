'use strict';

angular.module('issueTracker.homeController',[
    'issueTracker.authentication'
])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/home/home.html',
            controller:'HomeController'
        })

    }])
.controller('HomeController',['$scope','$location','authentication','role',function($scope,$location,authentication,role){

    if(!role.isAuthenticated){
        console.log(role.isAuthenticated);
        $location.path('/login');
    }

}]);