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
.controller('HomeController',['$scope','$location','authentication','role','$rootScope','$cookies',function($scope,$location,authentication,role,$rootScope,$cookies){

    if(!role.isAuthenticated()){
        $location.path('/login');
    }

    if(role.isAuthenticated){
        role.getUser()
            .then(function (user) {
                $rootScope.currentUser= user.Username;
                $scope.lead=user.Username;
                $rootScope.menuUser=true;

                $scope.role=user.isAdmin;

                if($cookies.get('usr_it')){

                    authentication.getUserIssues(role.getToken(),3,1)
                        .then(function (issues) {
                            $scope.issues=issues;
                        });

                    authentication.getAllProjects(role.getToken())
                        .then(function(projects){
                            $scope.projects=projects;
                        })
                }

            });
    }
}]);