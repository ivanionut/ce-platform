// Generated by CoffeeScript 1.3.3

ce.module("Controllers", function(self, ce, Backbone, Marionette, $, _) {
  return this.Assets = (function() {
    var assets;
    assets = function() {
      var main;
      main = void 0;
      this.collection = new self.collection;
      main = $("#app");
      this.collection.reset(main.data("assets"));
      window.col = this.collection;
      return main.removeData("assets");
    };
    assets.prototype.indexView = function() {
      var view;
      view = void 0;
      view = new self.views.indexView({
        collection: this.collection
      });
      return ce.mainRegion.show(view);
    };
    assets.prototype.editView = function(id) {
      var obj, view;
      obj = void 0;
      view = void 0;
      obj = this.collection.get(id);
      view = new self.views.editView({
        model: obj
      });
      return ce.mainRegion.show(view);
    };
    assets.prototype.showView = function(id) {
      var obj, view;
      obj = void 0;
      view = void 0;
      obj = this.collection.get(id);
      view = new self.views.showView({
        model: obj
      });
      return ce.mainRegion.show(view);
    };
    return assets;
  })();
});
