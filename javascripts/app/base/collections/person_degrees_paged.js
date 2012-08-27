/*! app/collections/person_degrees_paged
*   @requires: app,app/models/person_degree
*   @extends: app.Collection_paged
*   @exports: app.collections.Person_degrees_paged
*/
define("app/collections/Person_degrees_paged",["require","app","app/models"],function(require,app) {
  var Person_degreeModel = require("app/models/person_degree");

  var Person_degrees_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/person_degrees/'
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
          model: Person_degreeModel
      });

  module.setExports(Person_degrees_paged);
});
