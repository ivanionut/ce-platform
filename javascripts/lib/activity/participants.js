// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _, models, pagers) {
  return self.load = function(params) {
    self.details = {
      activityId: ce.activity.model.get("id"),
      AddlAttendees: params.legacy.AddlAttendees,
      currAttendee: params.legacy.currAttendee,
      currPerson: params.legacy.currPerson,
      MaxRegistrants: params.legacy.MaxRegistrants,
      NoChange: params.legacy.NoChange,
      nPageNo: params.legacy.nPageNo,
      nStatus: params.legacy.nStatus,
      selectedRows: params.legacy.selectedRows,
      selectedCount: params.legacy.selectedCount,
      totalAttendeeList: params.legacy.totalAttendeeList,
      rowsPerPage: params.legacy.rowsPerPage,
      totalPages: params.legacy.totalPages
    };
    self.paginatorCollection = pagers.Activity_participants.extend({
      server_api: {
        "$format": "json",
        "$top": function() {
          return this.totalPages * this.perPage;
        },
        "activityId": self.details.activityId,
        "orderby": "fullName",
        "$skip": function() {
          return this.totalPages * this.perPage;
        }
      }
    });
    self.collection = new self.paginatorCollection();
    self.topbar = new self.Topbar({
      el: ".js-top-bar"
    }).render();
    self.list = new self.List({
      el: ".js-attendee-rows",
      collection: self.collection
    }).render();
    self.bottombar = new self.Bottombar({
      el: ".js-bottom-bar"
    }).render();
    self.on("data_loaded", function() {
      self.pager = new ce.ui.Pager({
        el: ".js-pager-container",
        collection: self.collection
      });
      return self.pager.render();
    });
    return self.trigger("page_loaded");
  };
}, ce._core.models, ce._core.pagers);
