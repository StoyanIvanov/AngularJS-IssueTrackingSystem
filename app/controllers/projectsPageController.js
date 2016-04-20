'use strict';

angular.module('issueTracker.projectsPageController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects',{
            templateUrl:'app/templates/projects.html',
            controller:'ProjectsPageController'
        })

    }])
    .controller('ProjectsPageController',['$scope','$location','authentication','role','$routeParams','$rootScope',function($scope,$location,authentication,role,$routeParams,$rootScope){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var pages=[];
        var token=role.getToken();
        $scope.setPage=1;

        role.getUser()
            .then(function (user) {
                $rootScope.role=user.isAdmin;

                authentication.getProjects(token)
                    .then(function(projects){
                        console.log(projects);

                        for(var i = 1; i <= projects.TotalPages; i++){
                            var page={
                                number:i
                            };
                            pages.push(page);
                        };
                        $scope.pages=pages;
                        console.log(pages);
                        $scope.projects=projects.Projects;
                    })
            });

        $scope.editIssue=function(project){
            $location.path('/projects/'+project.Id);
        };

        $scope.toPage=function(page){
              if(page.number!=$scope.setPage){
                authentication.getProjects(token,'',10,page.number)
                    .then(function (projects) {
                        $scope.projects=projects.Projects;
                        $scope.setPage=page.number;
                    })
            }
        }

    }]);