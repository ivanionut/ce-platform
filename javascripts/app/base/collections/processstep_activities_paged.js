/*! app/collections/processstep_activities_paged
*   @requires: app,app/models/processstep_activity
*   @extends: app.Collection_paged
*   @exports: app.collections.Processstep_activities_paged
*/
define("app/collections/Processstep_activities_paged",["require","app","app/models"],function(require,app) {
  var Processstep_activityModel = require("app/models/processstep_activity");

  var Processstep_activities_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/processstep_activities/'
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
          model: Processstep_activityModel
      });

  module.setExports(Processstep_activities_paged);
});
