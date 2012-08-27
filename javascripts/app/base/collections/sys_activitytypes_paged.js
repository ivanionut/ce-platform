/*! app/collections/sys_activitytypes_paged
*   @requires: app,app/models/sys_activitytype
*   @extends: app.Collection_paged
*   @exports: app.collections.Sys_activitytypes_paged
*/
define("app/collections/Sys_activitytypes_paged",["require","app","app/models"],function(require,app) {
  var Sys_activitytypeModel = require("app/models/sys_activitytype");

  var Sys_activitytypes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/sys_activitytypes/'
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
          model: Sys_activitytypeModel
      });

  module.setExports(Sys_activitytypes_paged);
});
