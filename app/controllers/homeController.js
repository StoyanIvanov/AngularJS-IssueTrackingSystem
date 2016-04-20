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

    var pages=[];
    var token=role.getToken();
    var filter;
    $scope.setPage=1;

    if(role.isAuthenticated){
        role.getUser()
            .then(function (user) {
                $scope.lead=user.Username;
                $rootScope.role=user.isAdmin;

                if($cookies.get('usr_it')){
                    $rootScope.currentUser= user.Username;
                    $rootScope.menuUser=true;

                    filter='Lead.Id="'+user.Id+'"';
                    authentication.getUserIssues(token,3,1)
                        .then(function (issues) {
                            $scope.issues=issues;
                        });

                    authentication.getProjects(token,filter)
                        .then(function(projects){

                            for(var i = 1; i <= projects.TotalPages; i++){
                                var page={
                                    number:i
                                };
                                pages.push(page);
                            };
                            $scope.pages=pages;
                            $scope.projects=projects.Projects;
                        })
                }

            });
    }

    $scope.editIssue=function(issue){
        $location.path('/issues/'+issue.Id);
    };

    $scope.editProject=function(project){
        $location.path('/projects/'+project.Id);
    };

    $scope.toPage=function(page){
        if(page.number!=$scope.setPage){
            authentication.getProjects(token,filter,10,page.number)
                .then(function (projects) {
                    $scope.projects=projects.Projects;
                    $scope.setPage=page.number;
                })
        }
    }
}]);