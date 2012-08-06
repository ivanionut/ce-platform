#! ce.Views.People.IndexView extends Backbone.Marionette.CompositeView 
ce.module "Views.People", (self, ce, Backbone, Marionette, $, _) ->
  self.IndexView = Backbone.Marionette.CompositeView.extend(
    tagName: "table"
    itemView: self.RowView
    template: "people/index"
    events:
      "click .new": "newRecord"

    appendHtml: (collectionView, itemView) ->
      collectionView.$(".people").append itemView.el

    newRecord: ->
  )
