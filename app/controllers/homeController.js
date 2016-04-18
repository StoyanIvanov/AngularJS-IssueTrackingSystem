'use strict';

angular.module('issueTracker.homeController',[
    'issueTracker.authentication'
])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/templates/home.html',
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
                $scope.lead=user.Username;
                $scope.role=user.isAdmin;

                if($cookies.get('usr_it')){
                    $rootScope.currentUser= user.Username;
                    $rootScope.menuUser=true;

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

    $scope.editIssue=function(issue){
        $location.path('/issues/'+issue.Id);
    };

    $scope.editProject=function(project){
        $location.path('/projects/'+project.Id);
    }
}]);