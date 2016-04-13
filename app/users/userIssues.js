'use strict';


angular.module('issueTracker.dashboard.userIssues',[])
    .factory('userIssues',['$http','$q','BASE_URL','role',function($http,$q,BASE_URL,role){

        function getIssues(pageSize,pageNumber,orderBy){
            var deferred=$q.defer();
            pageSize = pageSize || 10;
            pageNumber = pageNumber || 1;
            orderBy = orderBy ||'DueDate desc';

            $http.get(BASE_URL+'Issues/me?pageSize='+pageSize+'&pageNumber='+pageNumber+'&orderBy='+orderBy+'')
                .then(function(issues){
                    deferred.resolve(issues.data);
                },function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getIssues:getIssues
        }

    }]);
