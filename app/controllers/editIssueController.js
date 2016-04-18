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

    }]);
