// Generated by CoffeeScript 1.3.3

ce.module("Routers", function(self, ce, Backbone, Marionette, $, _) {
  return self.Assets = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "": "index",
      "assets/:id/show": "show",
      "assets/:id/edit": "edit"
    }
  });
});
