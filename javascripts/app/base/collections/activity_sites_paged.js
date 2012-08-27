/*! app/collections/activity_sites_paged
*   @requires: app,app/models/activity_site
*   @extends: app.Collection_paged
*   @exports: app.collections.Activity_sites_paged
*/
define("app/collections/Activity_sites_paged",["require","app","app/models"],function(require,app) {
  var Activity_siteModel = require("app/models/activity_site");

  var Activity_sites_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/activity_sites/'
          },
          paginator_ui: {
            firstPage: 1,
            currentPage: 1,
            perPage: 15
          },
          parse: function(response) {
            this.totalPages = Math.ceil(response.length / this.perPage);
            return response;
          },
          model: Activity_siteModel
      });

  module.setExports(Activity_sites_paged);
});
