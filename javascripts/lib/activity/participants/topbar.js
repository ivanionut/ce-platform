// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  return self.Topbar = Backbone.View.extend({
    template: ce.templates.get("activity_participants-topbar"),
    render: function() {
      this.$el.html(_.template(this.template));
      self.trigger("topbar_loaded");
    }
  });
});
