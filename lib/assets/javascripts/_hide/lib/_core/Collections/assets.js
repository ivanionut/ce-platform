// Generated by CoffeeScript 1.3.3

ce.module("_core.collections", function(self, ce, Backbone, Marionette, $, _, models) {
  return self.Assets = Backbone.Collection.extend({
    url: '/assets/',
    model: models.Asset
  });
}, ce._core.models);