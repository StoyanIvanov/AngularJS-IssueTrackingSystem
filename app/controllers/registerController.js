'use strict';

angular.module('issueTracker.registerController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/register',{
            templateUrl:'app/templates/register.html',
            controller:'RegisterController'
        })

    }])
    .controller('RegisterController',['$scope','$location','authentication','role','$rootScope','noty',function($scope,$location,authentication,role,$rootScope,noty){

        if(!role.isAuthenticated()){

            $scope.register=function(user){
                authentication.registerUser(user)
                    .then(function (user) {
                        role.rememberUser(user.access_token,user.userName);
                        noty.show('The user is successful registered!',"success");
                        setTimeout(function(){ noty.closeAll() }, 1500);
                    }, function (error) {
                        noty.show('Login failed! '+ error.data.error_description,"error");
                        setTimeout(function(){ noty.closeAll() }, 2000);
                    })
            }
        }
    }]);