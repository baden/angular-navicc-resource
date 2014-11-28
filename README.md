Angular NaviCC API - API AngularJS Service for NaviCC server
=======================

[![Build Status](https://api.travis-ci.org/baden/angular-navicc-resource.svg)](https://travis-ci.org/baden/angular-navicc-resource)

Wraps the NaviCC API into a AngularJS service.

```js
angular.module('app', ['ngNaviccRouter'])
    .config(function(naviccRouterProvider) {
        naviccRouterProvider.setKey('YOUR_TOKEN');
    });
```

Inject the service to perform request to the api and get the returning promise.

```js
function AppCtrl(naviccRouter) {
  naviccRouter.system.get(ID).success(function(data) {
    $scope.system = data;
  });
}
```

### Available methods:

=======================

TBD
