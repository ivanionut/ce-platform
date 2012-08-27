/*! app/collections/objects_paged
*   @requires: app,app/models/object
*   @extends: app.Collection_paged
*   @exports: app.collections.Objects_paged
*/
define("app/collections/Objects_paged",["require","app","app/models"],function(require,app) {
  var ObjectModel = require("app/models/object");

  var Objects_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/objects/'
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
          model: ObjectModel
      });

  module.setExports(Objects_paged);
});
