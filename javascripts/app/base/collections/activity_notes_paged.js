/*! app/collections/activity_notes_paged
*   @requires: app,app/models/activity_note
*   @extends: app.Collection_paged
*   @exports: app.collections.Activity_notes_paged
*/
define("app/collections/Activity_notes_paged",["require","app","app/models"],function(require,app) {
  var Activity_noteModel = require("app/models/activity_note");

  var Activity_notes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/activity_notes/'
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
          model: Activity_noteModel
      });

  module.setExports(Activity_notes_paged);
});
