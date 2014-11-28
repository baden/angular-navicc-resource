describe('NaviccResourceAccount', function() {
  var naviccResource, request, PARAMS = {'foo': 'bar'};

  beforeEach(inject(function(_naviccResource_) {
    naviccResource = _naviccResource_;
    request = sinon.spy(naviccResource.$api, 'request');
  }));

  afterEach(function() {
    request.restore();
  });

  describe('#get(params)', function() {
    it('should exist and return a promise', function() {
        console.log("naviccResource=", naviccResource);
        expect(naviccResource).to.have.property('get');
        expect(naviccResource.get()).to.be.a.promise;
    });

    it('should execute a request with params', function() {
      naviccResource.get(PARAMS);
      expect(request).to.be.calledOnce;
      expect(request).to.be.calledWith(sinon.match.string, PARAMS);
    });
  });

});
