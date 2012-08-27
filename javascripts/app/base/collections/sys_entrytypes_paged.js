/*! app/collections/sys_entrytypes_paged
*   @requires: app,app/models/sys_entrytype
*   @extends: app.Collection_paged
*   @exports: app.collections.Sys_entrytypes_paged
*/
define("app/collections/Sys_entrytypes_paged",["require","app","app/models"],function(require,app) {
  var Sys_entrytypeModel = require("app/models/sys_entrytype");

  var Sys_entrytypes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/sys_entrytypes/'
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
          model: Sys_entrytypeModel
      });

  module.setExports(Sys_entrytypes_paged);
});
