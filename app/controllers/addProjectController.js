'use strict';

angular.module('issueTracker.addProjectController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/add',{
            templateUrl:'app/templates/addProject.html',
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

                var matches = project.key.match(/\b(\w)/g);
                var key=matches.join('');
                var labels=project.labels.split(",");
                var priorities=project.priority.split(",");


                //TODO Validation
                var newProject={
                    Name:project.name,
                    Description: project.description,
                    ProjectKey: key,
                    Labesl:labels,
                    Priorities: priorities,
                    LeadId: project.lead.Id
                };

                console.log(project)
        }

    }]);