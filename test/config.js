// Promisse helper
chai.use(function(_chai, utils) {
  var Assertion = _chai.Assertion;

  Assertion.addProperty('promise', function (type) {
    var obj = this._obj;
    expect(obj).to.have.property('then').that.is.a('function');
    expect(obj).to.have.property('catch').that.is.a('function');
    expect(obj).to.have.property('finally').that.is.a('function');
  });
});

// Configure an fake ApiKey
angular.module('ngNaviccResourceTestSuite', [
  'ngNaviccResource'
])
.config(function (naviccResourceProvider) {
    console.log('config', naviccResourceProvider),
    naviccResourceProvider.setKey('abcdefghijklmnopqrstuvwxyz0123456789');
});

beforeEach(module('ngNaviccResourceTestSuite'));
