/**
 * LoginCtrl
 *
 * @type {angular.controller}
 * @module  <%=unicorn.module %>
 * @description  The UI controller for user login
 *
 *               ## Primary responsibilities:
 *               Logging in users
 *
 */

angular.module('<%=unicorn.module %>')
.controller('LoginCtrl',
function($scope, $rootScope, $state, $timeout, uiMe , uiList, uiErrorBus, uiDirector) {

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // When the application is initially rendered
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//


  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  // DOM Events
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

  $scope.intent = angular.extend($scope.intent||{}, {

    login: function(){
      uiMe.syncing.form = true;
      uiMe.login($scope.user)
      .then(function onLogin(){
        $state.go('app.profile');
      })
      .catch(function onError(err){
        if(err.status >= 400 && err.status < 500){
          uiErrorBus.$handleError('Invalid username or password. Please try again.');
        }
        else if(err.status >= 500){
          uiErrorBus.$handleError(err);
        }
      })
      .finally(function eitherWay(){
        uiMe.syncing.form = false;
      });
    }

  });

});
