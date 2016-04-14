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
.controller('HomeController',['$scope','$location','authentication','role','$rootScope',function($scope,$location,authentication,role,$rootScope){

    if(!role.isAuthenticated()){

        $location.path('/login');
    }

    role.getUser()
        .then(function (user) {
            console.log(user);
            $rootScope.currentUser= user.Username;
            $rootScope.menuUser=true;
        });


}]);