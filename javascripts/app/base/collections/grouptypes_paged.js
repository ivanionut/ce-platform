/*! app/collections/grouptypes_paged
*   @requires: app,app/models/grouptype
*   @extends: app.Collection_paged
*   @exports: app.collections.Grouptypes_paged
*/
define("app/collections/Grouptypes_paged",["require","app","app/models"],function(require,app) {
  var GrouptypeModel = require("app/models/grouptype");

  var Grouptypes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/grouptypes/'
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
          model: GrouptypeModel
      });

  module.setExports(Grouptypes_paged);
});
