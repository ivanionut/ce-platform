/*! app/models/sys_activityrole 
* 	@requires: app
* 	@extends: app.Model
* 	@exports: app.models.Sys_activityrole
*/
define("app/models/sys_activityrole",["require","app"],function(require,app) {
	var Sys_activityroleModel = app.Model.extend({
		url: function() {
			base = "/api/sys_activityroles/"
            
            if(this.isNew()) {
                return base
            } else {
                return base + this.id
            }
		}
	});

	module.setExports(Sys_activityroleModel)
});
