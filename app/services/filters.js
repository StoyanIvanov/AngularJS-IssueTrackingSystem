'use strict';

angular.module('issueTracker.filter',[])
    .factory('createFilters',[
        function(){

        function createFilter(filter){
            if(filter.searchingType=="aprox"){
                return approximatelyFilter((filter))
            }

            if(filter.searchingType=="exact"){
                return exactFilter((filter))
            }
        }

        function approximatelyFilter(filter){

            var createdfilter='filter=';
            var element='';
            if(filter.title){createdfilter+='Title=="'+filter.title+'"';element=' or '}
            if(filter.projectId){createdfilter+= element + 'ProjectId=='+filter.projectId;element=' or '}
            if(filter.day){createdfilter+=element + 'DueDate.Day'+filter.day;element=' or '}
            if(filter.month){createdfilter+=element + 'DueDate.Month'+filter.month;element=' or '}
            if(filter.projectName){createdfilter+=element + 'Project.Name=="'+filter.projectName+'"';element=' or '}
            if(filter.leadUsername){createdfilter+=element + 'Project.Lead.Username=="'+filter.leadUsername+'"'}
            return createdfilter;

        }

        function exactFilter(filter){

            var createdfilter='filter=';
            var element='';
            if(filter.title){createdfilter+='Title=="'+filter.title+'"';element='&'}
            if(filter.projectId){createdfilter+= element + 'ProjectId=='+filter.projectId;element='&'}
            if(filter.day){createdfilter+=element + 'DueDate.Day'+filter.day;element='&'}
            if(filter.month){createdfilter+=element + 'DueDate.Month'+filter.month;element='&'}
            if(filter.projectName){createdfilter+=element + 'Project.Name=="'+filter.projectName+'"';element='&'}
            if(filter.leadUsername){createdfilter+=element + 'Project.Lead.Username=="'+filter.leadUsername+'"'}
            return createdfilter;

        }

        return{
            createFilter:createFilter
        };
    }]);