/*! app/collections/sys_testtypes_paged
*   @requires: app,app/models/sys_testtype
*   @extends: app.Collection_paged
*   @exports: app.collections.Sys_testtypes_paged
*/
define("app/collections/Sys_testtypes_paged",["require","app","app/models"],function(require,app) {
  var Sys_testtypeModel = require("app/models/sys_testtype");

  var Sys_testtypes_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/sys_testtypes/'
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
          model: Sys_testtypeModel
      });

  module.setExports(Sys_testtypes_paged);
});
