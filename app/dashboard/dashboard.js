'use strict';


angular.module('issueTracker.dashboard',['issueTracker.dashboard.userIssues'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/dashboard',{
            templateUrl:'app/dashboard/dashboard.html',
            controller:'DashboardController'
        })

    }])
    .controller('DashboardController',['$scope','role','userIssues',function($scope,role,userIssues){
        userIssues.getIssues()
            .then(function(issues){
                console.log(issues);
                $scope.issues=issues;
        })
    }]);