/*! app/collections/objectfieldtypes_paged
*   @requires: app,app/models/objectfieldtype
*   @extends: app.Collection_paged
*   @exports: app.collections.Objectfieldtypes_paged
*/
define("app/collections/Objectfieldtypes_paged",["require","app","app/models"],function(require,app) {
  var ObjectfieldtypeModel = require("app/models/objectfieldtype");

  var Objectfieldtypes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/objectfieldtypes/'
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
          model: ObjectfieldtypeModel
      });

  module.setExports(Objectfieldtypes_paged);
});
