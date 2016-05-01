npmModule.controller('getProfileInfoController', function($scope,$stateParams,$state,userProfile){
  $scope.userQuery='username';
  $scope.profileContainer=false;

//API CALL TO SERVICE TO GET THE PROFILE INFORMATION
  $scope.getUserInformation=function(name){
      $scope.userInfo=userProfile.get({username:name}).$promise.then(function(userData) {
          $scope.profile=userData;
          $scope.profileContainer=true;
          console.log($scope.profile);
       });
  }

//TO DETECT WHEN TO DISPLAY THE CONTENT(AFTER DATA HAS BEEN GIVEN FROM SERVER SHOW THE CONTENT)
  $scope.displayToggle=function(){
    console.log($scope.profileContainer);
    if($scope.profileContainer==true){
      return 'show-things';
    }else{
      return;
    }
  }

});
