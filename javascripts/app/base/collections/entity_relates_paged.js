/*! app/collections/entity_relates_paged
*   @requires: app,app/models/entity_relate
*   @extends: app.Collection_paged
*   @exports: app.collections.Entity_relates_paged
*/
define("app/collections/Entity_relates_paged",["require","app","app/models"],function(require,app) {
  var Entity_relateModel = require("app/models/entity_relate");

  var Entity_relates_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/entity_relates/'
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
          model: Entity_relateModel
      });

  module.setExports(Entity_relates_paged);
});
