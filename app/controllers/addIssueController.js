'use strict';

angular.module('issueTracker.addIssueController',[
        'issueTracker.authentication'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/:Id/add-issue',{
            templateUrl:'app/templates/addIssue.html',
            controller:'AddIssueController'
        })

    }])
    .controller('AddIssueController',['$scope','$location','authentication','role','$routeParams','$rootScope','noty',function($scope,$location,authentication,role,$routeParams,$rootScope,noty){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var projectId;
        var allProject={};
        var token=role.getToken();
        $scope.projectId=$routeParams.Id;

        role.getUser()
            .then(function (user) {
                $rootScope.role=user.isAdmin;
            });

        authentication.getAllProjects(token)
            .then(function(projects){
                $scope.issueProject=projects;
                allProject=projects;
            });

        authentication.getUsers(token)
            .then(function(users){
                $scope.users=users;
            });
        authentication.getLabels(token)
            .then(function(receiveLabels){
                $scope.labels=receiveLabels;
            });

        $scope.changePriority=function (selectedPriority){
            allProject.forEach(function(project){
               if(project.Name==selectedPriority){
                   $scope.priorities=project.Priorities;
                   projectId=project.Id;
               }
            });
        };

        $scope.update=function(issue){

            var user=JSON.parse(issue.user);
            var priority=JSON.parse(issue.priority);
            var labels=issue.labels.map(JSON.parse);


            var newIssue={
                Title : issue.title,
                Description : issue.description,
                DueDate : issue.selectDate,
                ProjectId : projectId,
                AssigneeId : user.Id,
                PriorityId : priority.Id,
                Labels:labels
            };
            console.log(newIssue);

            authentication.addIssue(token, newIssue)
                .then(function (response) {
                    noty.show('The issue is added successful!',"success");
                    setTimeout(function(){ noty.closeAll() }, 1500);
                })

        }

    }]);