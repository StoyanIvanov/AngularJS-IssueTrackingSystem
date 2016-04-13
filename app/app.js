'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
    'ngRoute',
    'ngCookies',
    'issueTracker.mainController',
    'issueTracker.homeController',
    'issueTracker.loginController',
    'issueTracker.registerController',
    'issueTracker.dashboard',
    'issueTracker.users.role',
    'issueTracker.general.menuButtons'

  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  }])
    .constant('BASE_URL','http://softuni-issue-tracker.azurewebsites.net/');
