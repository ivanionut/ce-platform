/*! app/collections/sys_orgtypes_paged
*   @requires: app,app/models/sys_orgtype
*   @extends: app.Collection_paged
*   @exports: app.collections.Sys_orgtypes_paged
*/
define("app/collections/Sys_orgtypes_paged",["require","app","app/models"],function(require,app) {
  var Sys_orgtypeModel = require("app/models/sys_orgtype");

  var Sys_orgtypes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/sys_orgtypes/'
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
          model: Sys_orgtypeModel
      });

  module.setExports(Sys_orgtypes_paged);
});
