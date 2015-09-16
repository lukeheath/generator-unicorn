/**
 * Module dependencies
 */

var dependencies = [
  'ui.router',
  'ngTouch',
  'ngAnimate',
  'ngMaterial',
  'ngMdIcons',
  'cloudsdk',
  'lodash'
];

/**
 * <%=unicorn.name %>
 *
 * @class        {angular.module}
 * @module       <%=unicorn.module %>
 * @type         {Function}
 * @description  An angular module for a web UI.
 */

angular.module('<%=unicorn.module %>', dependencies)

// Config angular material design
.config(function($mdThemingProvider, $locationProvider) {

  $mdThemingProvider.theme('default')
  .primaryPalette('<%=unicorn.color.primary.name %>')
  .accentPalette('<%=unicorn.color.accent.name %>')
  .warnPalette('<%=unicorn.color.warn.name %>')
  .backgroundPalette('<%=unicorn.color.background.name %>');

});