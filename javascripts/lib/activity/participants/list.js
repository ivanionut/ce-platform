// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _, models) {
  return self.List = Backbone.View.extend({
    initialize: function() {
      var coll;
      coll = this.collection;
      coll.on("add", this.addOne, this);
      coll.on("reset", this.addAll, this);
      self.on("participants_filtered", this.render, this);
      self.on("pager_next", this.render, this);
      self.on("pager_prev", this.render, this);
      self.on("page_loaded", this.render, this);
      coll.fetch({
        success: function() {
          coll.pager();
          self.trigger("data_loaded");
        },
        silent: true
      });
    },
    addAll: function() {
      this.$el.empty();
      this.collection.each(this.addOne);
    },
    addOne: function(viewModel) {
      var view;
      if (typeof viewModel.get("ISSELECTED") === "undefined") {
        viewModel.set({
          ISSELECTED: false
        });
        viewModel.set({
          ISFILTERMATCH: false
        });
      }
      view = new self.Row({
        model: viewModel
      });
      $(".js-attendee-rows").append(view.render().el);
    },
    render: function() {
      return console.log("COLLECTION RENDERING");
    }
  });
}, ce._core.models);
