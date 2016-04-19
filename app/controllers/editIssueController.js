'use strict';

angular.module('issueTracker.editIssueController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/issues/:Id',{
            templateUrl:'app/templates/editIssue.html',
            controller:'EditIssueController'
        })

    }])
    .controller('EditIssueController',['$scope','$location','authentication','role','$routeParams',function($scope,$location,authentication,role,$routeParams){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var issueId=$routeParams.Id;
        var user=undefined;
        var issueEdited=undefined;
        var statuses=[];
        $scope.disabled=true;
        $scope.visible=true;

        if(!issueEdited){

            role.getUser()
                .then(function (editerUser) {
                    user=editerUser;
                    $scope.role=user.isAdmin;

                    authentication.getIssue(role.getToken(),issueId)
                        .then(function (issue) {
                            var labels='';
                            console.log(issue);
                            issueEdited=issue;
                            $scope.statuses=statuses;
                            $scope.editedIssue=issue;

                            issue.AvailableStatuses.forEach(function(status){
                                statuses.push(status);
                            });

                            issue.Labels.forEach(function (label) {
                                labels=labels+label.Name+', ';
                            });

                            $scope.labels=labels;

                            if(issue.Assignee.Username==user.Username){
                                $scope.editButton=true;
                            }

                            authentication.getProject(role.getToken(),issue.Project.Id)
                                .then(function (project) {
                                    $scope.issueProject=project;
                                    $scope.priorities=project.Priorities;

                                    if(user.Username==project.Lead.Username){
                                        $scope.assign=true;
                                    };
                                });

                            authentication.getUsers(role.getToken())
                                .then(function (users) {
                                    $scope.users=users;
                                })

                        })
                });
        }

        $scope.edit=function(){
            $scope.disabled=!$scope.disabled;
            $scope.editable=!$scope.editable;
            $scope.visible = ! $scope.visible;

        };

        $scope.changeStatus=function(status){
            authentication.changeStatus(role.getToken(),issueId,status.Id)
                .then(function(receiveStatuses){
                    issueEdited.Status=status;
                    statuses=[];
                    receiveStatuses.forEach(function(status){
                        statuses.push(status);
                    });
                    console.log(statuses);
                    $scope.statuses=statuses;
                })
        }

        $scope.updateIssue=function (issue, assign, priority){
            console.log(assign)
            console.log(priority);
            issue.Assignee= JSON.parse(assign);
            issue.Priority= JSON.parse(priority);
            $scope.disabled=!$scope.disabled;
            $scope.editable=!$scope.editable;
            $scope.visible = ! $scope.visible;

            authentication.updateIssue(role.getToken(),issue)
                .then(function (returnedIssue) {
                    issueEdited=returnedIssue;
                    console.log(returnedIssue);
                })


        }

    }]);
