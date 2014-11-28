/**
 * Account.
 * http://doc.api.navi.cc/v3/accounts/
 * @param $api TBD
 * @return {Object}
 *
 * @description
 * Return current account resource
 */
function NaviccResourceAccount($api) {
    console.log("NaviccResourceAccount(", $api, ")");
    /**
     * Retrieves the current top dvd rentals.
     * http://developer.rottentomatoes.com/docs/json/v10/Top_Rentals
     * @param {Object} [params] The accepted request parameters.
     * @param {Integer} [param.limit] Limits the number of returned data.
     * @param {String} [param.country] The country to get data.
     * @return {HttpPromise}
     */
     function get(params) {
         console.log("NaviccResourceAccount:get(", params, ")");
         return $api.request('/account', params, []);
         //   return $api.request('/lists/dvds/top_rentals.json', params,
         //     ['limit', 'country']);
     }

    return {
        get: get
    };
}
