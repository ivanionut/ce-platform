// Generated by CoffeeScript 1.3.3

ce.module("Views.Activities", function(self, ce, Backbone, Marionette, $, _) {
  return self.IndexView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    itemView: self.RowView,
    template: "activities/index",
    events: {
      "click .new": "newRecord"
    },
    appendHtml: function(collectionView, itemView) {
      return collectionView.$(".activities").append(itemView.el);
    },
    newRecord: function() {}
  });
});
