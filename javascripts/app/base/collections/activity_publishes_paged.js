/*! app/collections/activity_publishes_paged
*   @requires: app,app/models/activity_publish
*   @extends: app.Collection_paged
*   @exports: app.collections.Activity_publishes_paged
*/
define("app/collections/Activity_publishes_paged",["require","app","app/models"],function(require,app) {
  var Activity_publishModel = require("app/models/activity_publish");

  var Activity_publishes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/activity_publishes/'
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
          model: Activity_publishModel
      });

  module.setExports(Activity_publishes_paged);
});
