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
            role.rememberUser(user);
            $rootScope.currentUser= user.Username;
            $rootScope.menuUser=true;
            $scope.lead=user.Username
            $scope.role=user.isAdmin;
        });

    authentication.getUserIssues(role.getToken(),3,1)
        .then(function (issues) {
            $scope.issues=issues;
        });

    authentication.getAllProjects(role.getToken())
        .then(function(projects){
            $scope.projects=projects;
        })




}]);