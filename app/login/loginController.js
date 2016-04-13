'use strict';

angular.module('issueTracker.loginController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/login',{
            templateUrl:'app/login/login.html',
            controller:'LoginController'
        })

    }])
    .controller('LoginController',['$scope','$location','authentication','role','$rootScope',function($scope,$location,authentication,role,$rootScope){

        if(!role.isAuthenticated){

            $scope.login=function(user){
                authentication.loginUser(user)
                    .then(function(user){
                        role.rememberUser(user.access_token,user.userName);
                        $rootScope.User = true;
                        $rootScope.currentUser=user.userName;
                        $location.path('/');
                    });
            };
        }


    }]);