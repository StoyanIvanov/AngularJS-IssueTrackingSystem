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
    .controller('LoginController',['$scope','$location','authentication','role','$rootScope','noty',function($scope,$location,authentication,role,$rootScope,noty){

        if(!role.isAuthenticated()){
            $scope.login=function(user){
                authentication.loginUser(user)
                    .then(function(user){
                        role.rememberUser(user);

                        noty.show('Success Login!',"success");
                        setTimeout(function(){ noty.closeAll() }, 1500);

                        role.getUser()
                            .then(function(){
                                $location.path('/');

                            });

                    });
            };
        }

    }]);