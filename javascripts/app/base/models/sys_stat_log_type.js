/*! app/models/sys_stat_log_type 
* 	@requires: app
* 	@extends: app.Model
* 	@exports: app.models.Sys_stat_log_type
*/
define("app/models/sys_stat_log_type",["require","app"],function(require,app) {
	var Sys_stat_log_typeModel = app.Model.extend({
		url: function() {
			base = "/api/sys_stat_log_types/"
            
            if(this.isNew()) {
                return base
            } else {
                return base + this.id
            }
		}
	});

	module.setExports(Sys_stat_log_typeModel)
});
