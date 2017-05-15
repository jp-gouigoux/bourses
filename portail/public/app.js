angular.module('App', ['vcRecaptcha']);

angular.module('App')
  .controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.captchaOK = false;
  }]);

