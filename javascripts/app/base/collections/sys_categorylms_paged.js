/*! app/collections/sys_categorylms_paged
*   @requires: app,app/models/sys_categorylm
*   @extends: app.Collection_paged
*   @exports: app.collections.Sys_categorylms_paged
*/
define("app/collections/Sys_categorylms_paged",["require","app","app/models"],function(require,app) {
  var Sys_categorylmModel = require("app/models/sys_categorylm");

  var Sys_categorylms_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/sys_categorylms/'
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
          model: Sys_categorylmModel
      });

  module.setExports(Sys_categorylms_paged);
});
