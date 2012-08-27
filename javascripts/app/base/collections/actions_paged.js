/*! app/collections/actions_paged
*   @requires: app,app/models/action
*   @extends: app.Collection_paged
*   @exports: app.collections.Actions_paged
*/
define("app/collections/Actions_paged",["require","app","app/models"],function(require,app) {
  var ActionModel = require("app/models/action");

  var Actions_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/actions/'
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
          model: ActionModel
      });

  module.setExports(Actions_paged);
});
