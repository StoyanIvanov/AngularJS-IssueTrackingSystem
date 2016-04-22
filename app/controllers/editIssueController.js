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
    .controller('EditIssueController',['$scope','$location','authentication','role','$routeParams','$rootScope','noty','$route',function($scope,$location,authentication,role,$routeParams,$rootScope,noty,$route){
        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var issueId=$routeParams.Id;
        var user=undefined;
        var issueEdited=undefined;
        var statuses=[];
        var token=role.getToken();
        $scope.disabled=true;
        $scope.visible=true;

        if(!issueEdited){

            role.getUser()
                .then(function (editerUser) {
                    user=editerUser;
                    $rootScope.role=user.isAdmin;

                    authentication.getIssue(token,issueId)
                        .then(function (issue) {
                            console.log(issue);
                            var labels='';
                            issueEdited=issue;
                            $scope.editedIssue=issue;

                            issue.AvailableStatuses.forEach(function(status){
                                statuses.push(status);
                            });
                            $scope.statuses=statuses;

                            issue.Labels.forEach(function (label) {
                                labels=labels+label.Name+', ';
                            });
                            $scope.labels=labels;

                            if(issue.Assignee.Username==user.Username){
                                $scope.editButton=true;
                            }

                            authentication.getProject(token,issue.Project.Id)
                                .then(function (project) {
                                    console.log(project);
                                    if(issueEdited.Assignee.Username==user.Username || project.Lead.Username==user.Username){
                                    }
                                    $scope.priorities=project.Priorities;

                                    if(user.Username==project.Lead.Username){
                                    }
                                });

                            authentication.getUsers(token)
                                .then(function (users) {
                                    $scope.users=users;
                                });

                            authentication.getIssueComments(token,issueEdited)
                                .then(function (comments) {
                                    $scope.comments=comments;
                                })
                        })
                });
        }

        $scope.edit=function(){
            $scope.disabled= ! $scope.disabled;
            $scope.editable= ! $scope.editable;
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
                    $scope.statuses=statuses;
                })
        };

        $scope.updateIssue=function(issue, assign, priority){
            issue.Assignee= JSON.parse(assign);
            issue.Priority= JSON.parse(priority);
            $scope.disabled=!$scope.disabled;
            $scope.editable=!$scope.editable;
            $scope.visible = ! $scope.visible;

            authentication.updateIssue(role.getToken(),issue)
                .then(function (returnedIssue) {
                    noty.show('The issue is update successful!',"success");
                    setTimeout(function(){ noty.closeAll() }, 1500);
                    $route.reload();
                }, function (error) {
                    noty.show('The update issue is failed! '+ error.data.error_description,"error");
                    setTimeout(function(){ noty.closeAll() }, 2000);
                })
        }
        
        $scope.addIssueComment= function (addComment) {

            var coment={

            }
        }

    }]);
