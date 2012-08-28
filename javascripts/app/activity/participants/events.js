// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  self.on("bottombar_loaded", function() {
    ce.log.info("participants: bottom bar loaded");
  });
  self.on("collection_rendered", function() {
    ce.log.info("participants: collection rendered");
  });
  self.on("filter_loaded", function() {
    ce.log.info("participants: filter loaded");
  });
  self.on("page_loaded", function() {
    ce.log.info("participants: page ready");
  });
  self.on("participant_md_toggled", function() {
    ce.log.info("participant: updated MD status");
  });
  self.on("participant_removed", function() {
    ce.log.info("participant: removed");
  });
  self.on("participant_reset", function() {
    ce.log.info("participant: reset");
  });
  self.on("participant_saved", function() {
    ce.log.info("participant: saved");
  });
  self.on("participant_status_updated", function(name) {
    ce.log.info("participants: statuses updated to " + name);
  });
  self.on("participants_filtered", function(name) {
    ce.log.info("participants: filter by " + name);
  });
  self.on("participants_loaded", function() {
    ce.log.info("participants: loaded");
  });
  self.on("participants_removed", function(participants) {
    ce.log.info("participants: " + participants.length + " removed");
  });
  self.on('printer_loaded', function() {
    ce.log.info("printer: loaded");
  });
  self.on('printer_printed', function() {
    ce.log.info("printer: job done");
  });
  self.on("selectallcheckbox_rendered", function() {
    return ce.log.info("participants: select all checkbox loaded");
  });
  self.on("statusdate_saved", function() {
    ce.log.info("participant: status date saved");
  });
  self.on("topbar_loaded", function() {
    ce.log.info("participants: top bar loaded");
  });
  return self.on("viewable_participant_date_changed", function() {
    ce.log.info("participants: viewable date changed");
    return;
  });
});
