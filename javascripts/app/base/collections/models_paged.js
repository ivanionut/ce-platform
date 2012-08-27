/*! app/collections/models_paged
*   @requires: app,app/models/model
*   @extends: app.Collection_paged
*   @exports: app.collections.Models_paged
*/
define("app/collections/Models_paged",["require","app","app/models"],function(require,app) {
  var ModelModel = require("app/models/model");

  var Models_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/models/'
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
          model: ModelModel
      });

  module.setExports(Models_paged);
});
