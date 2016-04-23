'use strict';

angular.module('issueTracker.paging',[])
    .factory('paging',[function(){

        function getPages(elements){
            var elementsArray=[];
            for(var i = 1; i <= elements.TotalPages; i++){
                var page={
                    number:i
                };
                elementsArray.push(page);
            }

            return elementsArray;
        }

        return {
            getPages:getPages
        }
    }]);