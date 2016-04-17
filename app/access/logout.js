'use strict';

angular.module('issueTracker.logout',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/logout',{
            templateUrl:'app/access/logout.html',
            controller:'LogoutController'
        })

    }])
    .controller('LogoutController',['role','$location','$cookies',function(role,$location){

        role.logout();
        $location.path('/');


    }]);