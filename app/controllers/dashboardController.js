'use strict';


angular.module('issueTracker.dashboardController',[])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/dashboard',{
            templateUrl:'app/templates/dashboard.html',
            controller:'DashboardController'
        })

    }])
    .controller('DashboardController',['$scope','role','userIssues',function($scope,role,userIssues){
        userIssues.getIssues()
            .then(function(issues){
                $scope.issues=issues;
        })
    }]);