// Generated by CoffeeScript 1.3.3

ce.module("activity", function(self, ce, Backbone, Marionette, $, _) {
  self.load = function(params) {
    self.userPrefs = {
      actListHeight: params.legacy.cActListHeight,
      actListOpen: params.legacy.cActListOpen,
      actListPosX: params.legacy.cActListPosX,
      actListPosY: params.legacy.cActListPosY,
      actListWidth: params.legacy.cActListWidth,
      actNotesOpen: params.legacy.cActNotesOpen,
      actNotesPosX: params.legacy.cActNotesPosX,
      actNotesPosY: params.legacy.cActNotesPosY
    };
    self.legacy = params.legacy;
    self.model = new ce.Models.Activity(params.modelData);
    return self.trigger("loaded");
  };
  return self.on("loaded", function() {
    return ce.log.info("activity: loaded");
  });
});
