/*! app/collections/entity_credits_paged
*   @requires: app,app/models/entity_credit
*   @extends: app.Collection_paged
*   @exports: app.collections.Entity_credits_paged
*/
define("app/collections/Entity_credits_paged",["require","app","app/models"],function(require,app) {
  var Entity_creditModel = require("app/models/entity_credit");

  var Entity_credits_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/entity_credits/'
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
          model: Entity_creditModel
      });

  module.setExports(Entity_credits_paged);
});
