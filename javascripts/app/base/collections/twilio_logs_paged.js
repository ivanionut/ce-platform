/*! app/collections/twilio_logs_paged
*   @requires: app,app/models/twilio_log
*   @extends: app.Collection_paged
*   @exports: app.collections.Twilio_logs_paged
*/
define("app/collections/Twilio_logs_paged",["require","app","app/models"],function(require,app) {
  var Twilio_logModel = require("app/models/twilio_log");

  var Twilio_logs_paged = app.Collection_paged.extend({
          initialize: function() {},
          paginator_core: {
            type: 'get',
            dataType: 'json',
            url: '/api/twilio_logs/'
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
          model: Twilio_logModel
      });

  module.setExports(Twilio_logs_paged);
});
