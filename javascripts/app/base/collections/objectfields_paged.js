/*! app/collections/objectfields_paged
*   @requires: app,app/models/objectfield
*   @extends: app.Collection_paged
*   @exports: app.collections.Objectfields_paged
*/
define("app/collections/Objectfields_paged",["require","app","app/models"],function(require,app) {
  var ObjectfieldModel = require("app/models/objectfield");

  var Objectfields_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/objectfields/'
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
          model: ObjectfieldModel
      });

  module.setExports(Objectfields_paged);
});
