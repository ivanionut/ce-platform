ce.module "ui", (self, ce, Backbone, Marionette, $, _) ->
  self.Pager = Backbone.View.extend
    template: ce.templates.get "ui-pager"
    initialize: ->
      @collection.on "change", @render, this
      @collection.on "reset", @render, this

    events:
      "click a.js-next-page": "nextPage"
      "click a.js-page": "selectPage"
      "click a.js-prev-page": "prevPage"

    render: ->
      #@$el.html ""
      
      # FORM THE TEMPLATE AND APPEND THE TEMPLATE HTML
      @$el.append _.template @template, @collection.info()
      self.trigger "pager_loaded"
      @el

    nextPage: ->
      @collection.nextPage()
      self.trigger "pager_next"

    prevPage: ->
      @collection.previousPage()
      self.trigger "pager_prev"

    selectPage: ->
      pageNo = parseInt($(this).text())
      @collection.goTo pageNo
      self.trigger "pager_page_selected"

    updatePageDropdown: ->
      dropdown = @$el.find ".js-pages"
      pageNo = 1

      while pageNo <= @collection.totalPages
        pageEl = $("<li>")
        pageLink = $("<a />").addClass("js-page").text(pageNo).append pageLink
        pageEl.appendTo dropdown
        pageNo++
      self.trigger "pager_dropdown_loaded"
