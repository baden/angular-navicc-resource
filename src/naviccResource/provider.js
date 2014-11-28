/**
 * Navicc Resource service provider to access API data.
 * http://doc.api.navi.cc
 */
function NaviccResourceProvider() {
    console.log("NaviccResourceProvider()");
  var provider = this;

  provider.key = null;
  provider.apiVersion = 'v1.0';
  provider.url = 'http://api.eomy.navi.cc/:version/'
    .replace(/:version/, provider.apiVersion);
  provider.config = {
    params: {
      apikey: null,
      callback: 'JSON_CALLBACK'
    }
  };

  /**
   * Set the API key.
   * @param {String} value - The NaviCC API.
   */
  provider.setKey = function(value) {
    provider.key = provider.config.params.apikey = value;
  };

  /**
   * Extends the API defaults params object with custom values.
   * @param {Object} defaults - Source object.
   * @return {Object}
   */
  provider.setDefaults = function(defaults) {
    provider.config = angular.extend(provider.config.params, defaults || {});
    return provider.config;
  };

  /**
   * Convert the keys of an object from camelCase to snake_case.
   * @param {Object} src - the source object.
   * @return {Object}
   */
  function _snakeCaseKeys(src) {
    var dest = {};
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        key = key;
        dest[key.replace(/([A-Z]{1,})/g, '_$1').toLowerCase()] = src[key];
      }
    }
    return dest;
  }

  /**
   * NaviccRouter Service Factory.
   * @requires $http
   * @requires $log
   * @return {Object}
   *
   * @description
   * Return all endpoints services provided by the Navicc API.
   */
  function NaviccResourceFactory($http, $log) {
    // Warn if key is missing
    if (!angular.isString(provider.key)) {
      throw 'Missing NaviCC API key.';
    }

    var factoryDefinition = {},
        $api = {};

    /**
     * Performs a request to Rotten Tomatoes API. Wrapping the $http service to
     * format the correct params.
     * @param {String} URN - The uniform resource name.
     * @param {Object} [config] - Optional configuration object.
     * @return {HttpPromise}
     */
    $api.request = function(urn, params) {
        console.log("NaviccResourceFactory.request()", urn, params);
      var _params = params || {},
          _uri = provider.url + urn.replace(/^\//, ''),
          _config = angular.copy(provider.config);

      // Convert and merge params
      angular.extend(_config.params, _snakeCaseKeys(_params));

      $log.debug('Requesting ' + _uri);

        console.log("Fetch..................." + _uri );
    //   return $http.jsonp(_uri, _config).then(function(response) {
    //   return $http({
    //                 method: 'GET',
    //                 url: _uri
    //             }).then(function(response) {
      return $http.get(_uri, _config).then(function(response) {
          console.log("====>>> Return", response);
          $log.debug(response.status + ' ' + response.config.url);
          return response;
      }, function(error) {
          console.log("====>>> Return Error:", error);
          $log.error(error);
          return error;
      });
    };

    /**
     * Performs a request to Rotten Tomatoes API replacing any :id key in the
     * URN by the given value.
     * @param {*} id - The id to be replaced.
     * @param {String} URN - The uniform resource name.
     * @param {Object} [config] - Optional configuration object.
     * @return {HttpPromise}
     */
    $api.requestId = function(id, urn, params) {
      return $api.request(urn.replace(/:id/, id), params);
    };

    /**
     * Returns the API config object.
     * @return {Object}
     */
    $api.config = provider.config;

    // Define the factory methods
    angular.extend(factoryDefinition, {'$api': $api});
    angular.extend(factoryDefinition, new NaviccResourceAccount($api));
    // angular.extend(factoryDefinition, new RottenTomatoesMoviesList($api));
    // angular.extend(factoryDefinition, new RottenTomatoesDvdsList($api));

    return factoryDefinition;
  }

  // Setup the factory
  console.log("define $get");
  this.$get = ['$http', '$log', NaviccResourceFactory];
}
