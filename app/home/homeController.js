'use strict';


angular.module('issueTracker.home',[
    'issueTracker.authentication'
])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/home/home.html',
            controller:'HomeController'
        })

    }])
.controller('HomeController',['$scope','authentication',function($scope,authentication){
    $scope.login=function(user){
        authentication.loginUser(user);

    };

    $scope.register=function(user){
        authentication.registerUser(user)
            .then(function (user) {
                console.log(user);
            })
    }

}]);