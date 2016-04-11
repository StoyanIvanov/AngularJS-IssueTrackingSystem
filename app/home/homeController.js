'use strict';


angular.module('issueTracker.home',[
    'issueTracker.authentication',
    'ngCookies'
])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/home/home.html',
            controller:'HomeController'
        })

    }])
.controller('HomeController',['$scope','','authentication','role',function($scope,authentication,role){

    $scope.login=function(user){
        authentication.loginUser(user)
            .then(function(user){
                $location.path('/dashboard');
                role.rememberUser(user.access_token,user.userName);
            });
    };

    $scope.register=function(user){
        authentication.registerUser(user)
            .then(function (user) {
                role.rememberUser(user.access_token,user.userName);
            })
    }

}]);