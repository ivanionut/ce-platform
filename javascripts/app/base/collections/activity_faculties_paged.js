/*! app/collections/activity_faculties_paged
*   @requires: app,app/models/activity_faculty
*   @extends: app.Collection_paged
*   @exports: app.collections.Activity_faculties_paged
*/
define("app/collections/Activity_faculties_paged",["require","app","app/models"],function(require,app) {
  var Activity_facultyModel = require("app/models/activity_faculty");

  var Activity_faculties_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/activity_faculties/'
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
          model: Activity_facultyModel
      });

  module.setExports(Activity_faculties_paged);
});
