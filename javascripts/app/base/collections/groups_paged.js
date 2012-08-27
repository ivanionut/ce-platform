/*! app/collections/groups_paged
*   @requires: app,app/models/group
*   @extends: app.Collection_paged
*   @exports: app.collections.Groups_paged
*/
define("app/collections/Groups_paged",["require","app","app/models"],function(require,app) {
  var GroupModel = require("app/models/group");

  var Groups_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/groups/'
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
          model: GroupModel
      });

  module.setExports(Groups_paged);
});
