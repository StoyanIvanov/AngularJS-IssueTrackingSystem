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
    .controller('AddIssueController',[
        '$scope',
        '$location',
        'authentication',
        'role',
        '$routeParams',
        '$rootScope',
        'noty',
        function($scope,$location,authentication,role,$routeParams,$rootScope,noty){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var projectId=$routeParams.Id;;
        var allProject={};
        var token=role.getToken();
        $scope.projectId=$routeParams.Id;

        role.getUser()
            .then(function (user) {
                $rootScope.role=user.isAdmin;
            });

        authentication.getProject(token,projectId)
            .then(function(project){
                console.log(project)
                $scope.Project=project;
                $scope.addIssue.project=project.Name;
                allProject=project;
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
            console.log(issue);

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

            authentication.addIssue(token, newIssue)
                .then(function (response) {
                    noty.show('The issue is added successful!',"Information");
                    setTimeout(function(){ noty.closeAll() }, 1500);
                    $location.path('/projects/'+projectId);
                },function(error){
                    noty.show('Login failed! '+ error.data.error_description,"error");
                    setTimeout(function(){ noty.closeAll() }, 2000);
                })

        }

    }]);