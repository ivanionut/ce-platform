// Generated by CoffeeScript 1.3.3

ce.module("_core.controllers", function(self, ce, Backbone, Marionette, $, _) {
  return this.Activity_participants = (function() {
    var activity_participants;
    activity_participants = function() {
      var main;
      main = void 0;
      this.collection = new self.collection;
      main = $("#app");
      this.collection.reset(main.data("activity_participants"));
      window.col = this.collection;
      return main.removeData("activity_participants");
    };
    activity_participants.prototype.indexView = function() {
      var view;
      view = void 0;
      view = new self.views.indexView({
        collection: this.collection
      });
      return ce.mainRegion.show(view);
    };
    activity_participants.prototype.editView = function(id) {
      var obj, view;
      obj = void 0;
      view = void 0;
      obj = this.collection.get(id);
      view = new self.views.editView({
        model: obj
      });
      return ce.mainRegion.show(view);
    };
    activity_participants.prototype.showView = function(id) {
      var obj, view;
      obj = void 0;
      view = void 0;
      obj = this.collection.get(id);
      view = new self.views.showView({
        model: obj
      });
      return ce.mainRegion.show(view);
    };
    return activity_participants;
  })();
});