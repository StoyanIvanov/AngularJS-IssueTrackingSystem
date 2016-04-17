'use strict';

angular.module('issueTracker.projectPageController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/:Id',{
            templateUrl:'app/projects/project-page.html',
            controller:'ProjectPageController'
        })

    }])
    .controller('ProjectPageController',['$scope','$location','authentication','role','$routeParams',function($scope,$location,authentication,role,$routeParams){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

            var project={};

            role.getUser()
                .then(function (user) {
                    $scope.role=user.isAdmin;

                    authentication.getProject(role.getToken(),$routeParams.Id)
                        .then(function(editedProject){
                            project=editedProject;
                            var label='';
                            var priorities='';
                            project=editedProject;

                            project.Labels.forEach(function(element){
                                label+=element.Name+', ';
                            });
                            project.Priorities.forEach(function(element){
                                priorities+=element.Name+', ';
                            });

                            $scope.projectId=project.Id;

                            $scope.Name=project.Name;
                            $scope.Key=project.ProjectKey;
                            $scope.Description=project.Description;
                            $scope.Lead=project.Lead.Username;
                            $scope.Labels=label;
                            $scope.Priorities=priorities;

                            $scope.inputName=project.Name;
                            $scope.inputDescription=project.Description;
                            $scope.inputLead=project.Lead.Username;
                        })
                        .then(function(){
                            authentication.getIssuesByFilter(role.getToken(),'filter=Project.Name=="'+project.Name+'"')
                                .then(function(issues){
                                    $scope.issues=issues
                                });
                        });

                });


        $scope.update=function(inputName, inputDescription, inputLead){
            //TODO Validation
            var labels = $scope.Labels.split(',');
            var priorities = $scope.Priorities.split(',');

            authentication.getUsers(role.getToken())
                .then(function(users){
                    var searchUser={};

                    users.forEach(function(element){
                        if(element.Username===inputLead){
                            searchUser=element;
                            console.log(element);
                        }
                    });

                    //If the new user exist and is a Admin
                    if(searchUser){

                        project.Name = inputName;
                        project.Description = inputDescription;
                        project.Labels = labels;
                        project.Priorities = priorities;
                        project.Lead.Username = searchUser.Username;
                        project.Lead.Id = searchUser.Id;
                        project.Lead.isAdmin = searchUser.isAdmin;

                        authentication.updateProject(role.getToken(),project)
                            .then(function(response){
                                console.log(response);
                            })
                    }

                });
        };

        $scope.formEnable=function(){
            $scope.form=true;

        };

    }]);