// Generated by CoffeeScript 1.3.3

ce.module("_core.Collections", function(self, ce, Backbone, Marionette, $, _, models) {
  return self.Activities = Backbone.Collection.extend({
    url: '/activities/',
    model: models.Activity
  });
}, ce._core.models);
