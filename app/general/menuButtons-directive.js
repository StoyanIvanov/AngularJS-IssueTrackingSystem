'use strict';

angular.module('issueTracker.general.menuButtons',[])
.directive('menuButtons',[function(){

    return {
        restrict:'A',
        templateURL:'app/templates/menuButtons-template.html'
    }

}]);