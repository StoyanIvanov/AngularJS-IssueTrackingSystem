'use strict';

angular.module('issueTracker.addProjectController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/add',{
            templateUrl:'app/projects/addProject.html',
            controller:'AddProjectController'
        })

    }])
    .controller('AddProjectController',['$scope','$location','authentication','role','$rootScope',function($scope,$location,authentication,role,$rootScope){

        if(role.isAuthenticated()){
            authentication.getUsers(role.getToken())
                .then(function(users){
                    $scope.users=users;
                })

        }

        $scope.add=function(project){

            if(role.isAuthenticated()){
                //TODO Validation
                var newProject={
                    Name:project.name,
                    Description: project.description,
                    ProjectKey: project.key,
                    LeadId: project.lead,
                    Priorities: project.priority
                };
            }
        }

    }]);