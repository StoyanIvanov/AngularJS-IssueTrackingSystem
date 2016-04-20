'use strict';

angular.module('issueTracker.loginController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/login',{
            templateUrl:'app/templates/login.html',
            controller:'LoginController'
        })

    }])
    .controller('LoginController',['$scope','$location','authentication','role','$rootScope',function($scope,$location,authentication,role){

        if(!role.isAuthenticated()){
            $scope.login=function(user){
                authentication.loginUser(user)
                    .then(function(user){
                        role.rememberUser(user);
                        role.getUser()
                            .then(function(){
                                //$scope.showNotification('Login successful!');
                                $location.path('/');
                            });

                    });
            };
        }

    }]);