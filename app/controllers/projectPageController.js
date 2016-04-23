'use strict';

angular.module('issueTracker.projectPageController',[
        'issueTracker.authentication',
        'issueTracker.filter'
    ])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/projects/:Id',{
            templateUrl:'app/templates/project-page.html',
            controller:'ProjectPageController'
        })

    }])
    .controller('ProjectPageController',[
        '$scope',
        '$location',
        'authentication',
        'role',
        '$routeParams',
        '$rootScope',
        'noty',
        '$route',
        'createFilters',
        'paging',
        function($scope,$location,authentication,role,$routeParams,$rootScope,noty,$route,createFilters,paging){

        if(!role.isAuthenticated()){
            $location.path('/');
        }

        var project={};
        var filter;
        var user;
        var token=role.getToken();
        $scope.setIssuesPage=1;

        role.getUser()
            .then(function (myUser) {
                user=myUser;
                if(myUser.isAdmin){
                    $scope.addIssue=true;
                    $scope.edit=true;
                }

                authentication.getProject(token,$routeParams.Id)
                    .then(function(editedProject){
                        var label='';
                        var priorities='';
                        project=editedProject;
                        if(project.Lead.Username==user.Username){
                            $scope.addIssue=true;
                            $scope.edit=true;
                        }

                        project.Labels.forEach(function(element){
                            label+=element.Name+', ';
                        });
                        project.Priorities.forEach(function(element){
                            priorities+=element.Name+', ';
                        });

                        $scope.projectId=project.Id;
                        $scope.Name=project.Name;
                        $scope.Key=project.ProjectKey;
                        $scope.Description=project.Description;
                        $scope.Lead=project.Lead.Username;
                        $scope.Labels=label;
                        $scope.Priorities=priorities;
                        $scope.inputName=project.Name;
                        $scope.inputDescription=project.Description;
                        $scope.inputLead=project.Lead.Username;
                    })
                    .then(function(){
                        authentication.getIssuesByFilter(token,'filter=Project.Name=="'+project.Name+'"')
                            .then(function(issues){
                                $scope.issues=issues
                            });
                    });
            });

        $scope.update=function(inputName, inputDescription, inputLead){
            //TODO Validation
            authentication.getUsers(token)
                .then(function(users){
                    var searchUser={};

                    users.forEach(function(element){
                        if(element.Username===inputLead){
                            searchUser=element;
                        }
                    });

                    //If the new user exist and is a Admin
                    if(searchUser){

                        project.Name = inputName;
                        project.Description = inputDescription;
                        project.Lead.Username = searchUser.Username;
                        project.Lead.Id = searchUser.Id;
                        project.Lead.isAdmin = searchUser.isAdmin;

                        authentication.updateProject(token,project)
                            .then(function(){
                                noty.show('Update is successfully!',"success");
                                setTimeout(function(){ noty.closeAll() }, 1500);
                                $route.reload();
                            }, function (error) {
                                noty.show('LUpdate faild! '+ error.data.error_description,"error");
                                setTimeout(function(){ noty.closeAll() }, 2000);
                            })
                    }
                });
        };

        $scope.formEnable=function(){
            $scope.form=true;

        };

        $scope.editIssue=function(issue){
            $location.path('/issues/'+issue.Id);
        };

        $scope.findIssues=function(filterData){
            filter = createFilters.createFilter(filterData);
            authentication.getIssuesByFilter(token,filter,5)
                .then(function (issues) {
                    if(issues.TotalCount==0){
                        noty.show('The issues not found! ',"information");
                        setTimeout(function(){ noty.closeAll() }, 3000);
                    }
                    $scope.issuesPages=paging.getPages(issues);
                    $scope.filteredIssues=issues.Issues;
                }, function (error) {
                    noty.show('Error! '+ error.data.error_description,"error");
                    setTimeout(function(){ noty.closeAll() }, 2000);
                })
        };

        $scope.toIssuesPage=function(page){
            if(page.number!=$scope.setIssuesPage){
                authentication.getIssuesByFilter(token,filter,5,page.number)
                    .then(function (issues) {
                        $scope.filteredIssues=issues.Issues;
                        $scope.setIssuesPage=page.number;
                    })
            }
        }

    }]);