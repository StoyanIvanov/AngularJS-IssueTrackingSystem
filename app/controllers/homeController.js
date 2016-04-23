'use strict';

angular.module('issueTracker.homeController',[
    'issueTracker.authentication'
])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/',{
            templateUrl:'app/templates/home.html',
            controller:'HomeController'
        })
    }])
.controller('HomeController',[
    '$scope',
    '$location',
    'authentication',
    'role',
    '$rootScope',
    '$cookies',
    'paging',
    function($scope,$location,authentication,role,$rootScope,$cookies,paging){

    if(!role.isAuthenticated()){
        $location.path('/login');
    }

    if(role.isAuthenticated){

        var token=role.getToken();
        var filter;
        $scope.setProjectPage=1;
        $scope.setIssuesPage=1;

        role.getUser()
            .then(function (user) {
                $scope.lead=user.Username;
                $rootScope.role=user.isAdmin;

                if($cookies.get('usr_it')){
                    $rootScope.currentUser= user.Username;
                    $rootScope.menuUser=true;

                    filter='Lead.Id="'+user.Id+'"';
                    authentication.getUserIssues(token,'',10)
                        .then(function (issues) {
                            $scope.issuesPages=paging.getPages(issues);
                            $scope.issues=issues.Issues;
                        });

                    authentication.getProjects(token,filter)
                        .then(function(projects){
                            $scope.projectPages=paging.getPages(projects);
                            $scope.projects=projects.Projects;
                        })
                }
            });
    }

    $scope.editIssue=function(issue){
        $location.path('/issues/'+issue.Id);
    };

    $scope.editProject=function(project){
        $location.path('/projects/'+project.Id);
    };

    $scope.toProjectPage=function(page){
        if(page.number!=$scope.setProjectPage){
            authentication.getProjects(token,filter,10,page.number)
                .then(function (projects) {
                    $scope.projects=projects.Projects;
                    $scope.setProjectPage=page.number;
                })
        }
    };

    $scope.toIssuesPage=function(page){
        if(page.number!=$scope.setIssuesPage){
            authentication.getUserIssues(token,'',10,page.number)
                .then(function (issues) {
                    $scope.issues=issues.Issues;
                    $scope.setIssuesPage=page.number;
                })
        }
    }
}]);