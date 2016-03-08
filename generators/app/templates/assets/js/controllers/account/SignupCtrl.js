/**
 * SignupCtrl
 *
 * @type {angular.controller}
 * @module  <%=unicorn.module %>
 * @description  The UI controller for user signup
 *
 *               ## Primary responsibilities:
 *               Signing users up
 *
 */

angular.module('<%=unicorn.module %>')
.controller('SignupCtrl',
function($window, $scope, $rootScope, $state, $location, uiMe , uiList, uiErrorBus, _) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  
  // If this is an integration signup, 
  // get the integration record
  if($location.search().integrate){
    uiMe.getIntegration()
    .then(function onSuccess(){
      $scope.user = {
        email: uiMe.integration.email,
        integrationId: uiMe.integration.id
      };
    });
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    signup: function(){
      uiMe.syncing.form = true;
      uiMe.signup($scope.user)
      .then(function onLogin(){
        uiMe.fetch()
        .then(function onSuccess(){
          $state.go('app.profile');
        });
      })
      .catch(function onError(err){

        // If this is a client error,
        // provide the error message
        if(err.data.status >= 400 && err.data.status < 500){
          // Loop through invalidAttributes object in case there are multiple
          // although currently Treeline returns the first invalid attribute only
          _.forEach(err.data.invalidAttributes, function(attributeObject, key){
            uiErrorBus.$handleError(attributeObject[0].message);
          });
        }
        // Else a server error,
        // provide the full error object
        else{
          uiErrorBus.$handleError(err);
        }
        
      })
      .finally(function eitherWay(){
        uiMe.syncing.form = false;
      });
    }

  });

});
