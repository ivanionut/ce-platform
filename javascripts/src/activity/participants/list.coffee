#! ce.Views.Activity_participants.IndexView extends Backbone.Marionette.CompositeView 
ce.module "activity.participants", (self, ce, Backbone, Marionette, $, _, models) ->
  self.List = Backbone.View.extend
    template: ce.templates.get "activity_participants-table"
    rowEl: ".js-attendee-rows"
    className: "activity_participants-page"
    initialize: ->
      coll = @collection
      coll.on "add", @addOne, this
      coll.on "all", @addAll, this
      coll.on "reset", @addAll, this

      coll.fetch
        success: ->
          coll.pager()
          return
        silent: true

    model: models.Activity_participant

    render: ->
      # RENDER TEMPLATE AND USE AS PAGE HTML
      @$el.html _.template @template

    addAll: ->
      @$el.empty
      @collection.each @addOne
      return

    addOne: ->
      view = new self.Row()
      $(@rowEl).append view.render()
      return

,ce._core.models
  