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
    .controller('AddProjectController',[
        '$scope',
        '$location',
        'authentication',
        'role',
        '$rootScope',
        'noty',
        function($scope,$location,authentication,role,$rootScope,noty){

            if(!role.isAuthenticated()){
                $location.path('/');
            }

            if(role.isAuthenticated()){
                authentication.getUsers(role.getToken())
                    .then(function(users){
                        $scope.users=users;
                    })
            }

            var token=role.getToken();

            $scope.add=function(project){
                var matches = project.name.match(/\b(\w)/g);
                var key=matches.join('');
                var inputLabels=project.labels;
                var labels=inputLabels.split(",");
                var inputPriority=project.priority;
                var priorities=inputPriority.split(",");


                //TODO Validation
                var newProject={
                    Name:project.name,
                    Description: project.description,
                    ProjectKey: key,
                    Labels:labels,
                    Priorities: priorities,
                    LeadId: project.lead.Id
                };

                authentication.addProject(token,newProject)
                    .then(function (responce) {
                        noty.show('The project is added successful!',"success");
                        setTimeout(function(){ noty.closeAll() }, 1500);
                    },function(error){
                        noty.show('Login failed! '+ error.data.error_description,"error");
                        setTimeout(function(){ noty.closeAll() }, 2000);
                    });

            }

    }]);