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
    .controller('ProjectsPageController',['$scope','$location','authentication','role','$routeParams','$rootScope','paging',function($scope,$location,authentication,role,$routeParams,$rootScope,paging){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var token=role.getToken();
        $scope.setPage=1;

        role.getUser()
            .then(function (user) {
                $rootScope.role=user.isAdmin;

                authentication.getProjects(token)
                    .then(function(projects){
                        $scope.pages=paging.getPages(projects);
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