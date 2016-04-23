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
    .controller('RegisterController',[
        '$scope',
        '$location',
        'authentication',
        'role',
        '$rootScope',
        'noty',
        function($scope,$location,authentication,role,$rootScope,noty){

        if(!role.isAuthenticated()){

            $scope.register=function(user){
                var newUser=user;
                authentication.registerUser(user)
                    .then(function (user) {
                        noty.show('The user is successful registered!',"success");
                        setTimeout(function(){ noty.closeAll() }, 1500);
                        authentication.loginUser(newUser)
                            .then(function (user) {
                                role.rememberUser(user);
                            })
                    }, function (error) {
                        noty.show('Login failed! '+ error.data.error_description,"error");
                        setTimeout(function(){ noty.closeAll() }, 2000);
                    })
            }
        }
    }]);