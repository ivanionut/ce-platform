/*!
 * CE Platform
 * http://ccpd.uc.edu/
 * 
 * Copyright (c)2012 University of Cincinnati
 * You are not authorized to use this code without receiving direct concent from the University of Cincinnati.
 *
 * @module: activities
 * @def: Router
 */
 
CE.module("activities",function(self,CE,Backbone,Marionette,$,_) {
	this.router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'': 'indexView',
			'activities/:id': 'showView',
			'activities/:id/edit': 'editView'
		}
	});
});
