'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
    'ngRoute',
    'ngCookies',
    'notyModule',
    'issueTracker.mainController',
    'issueTracker.homeController',
    'issueTracker.loginController',
    'issueTracker.registerController',
    'issueTracker.dashboardController',
    'issueTracker.users.role',
    'issueTracker.addProjectController',
    'issueTracker.projectPageController',
    'issueTracker.addIssueController',
    'issueTracker.logout',
    'issueTracker.editIssueController',
    'issueTracker.projectsPageController',
    'issueTracker.changePasswordController'

  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
