// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  return self.Bottombar = Backbone.View.extend({
    template: "activity_participants-bottombar",
    render: function() {
      var _temp;
      this.$el.empty();
      _temp = ce.templates.get(this.template);
      this.$el.html(_.template(_temp));
      self.trigger("bottombar_loaded");
    }
  });
});