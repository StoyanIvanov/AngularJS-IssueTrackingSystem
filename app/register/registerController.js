'use strict';

angular.module('issueTracker.registerController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/register',{
            templateUrl:'app/register/register.html',
            controller:'RegisterController'
        })

    }])
    .controller('RegisterController',['$scope','$location','authentication','role','$rootScope',function($scope,$location,authentication,role,$rootScope){

        if(!role.isAuthenticated){

            $scope.register=function(user){
                authentication.registerUser(user)
                    .then(function (user) {
                        role.rememberUser(user.access_token,user.userName);
                    })
            }
        }


    }]);