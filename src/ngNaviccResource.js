(function(angular) {
  //= include_tree naviccResource/
  angular.module('ngNaviccResource', [])
  .provider('naviccResource', NaviccResourceProvider);
})(window.angular);
