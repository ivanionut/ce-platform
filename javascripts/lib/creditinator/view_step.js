// Generated by CoffeeScript 1.3.3

ce.module("creditinator", function(self, ce, Backbone, Marionette, $, _, models, log) {
  self.views = self.views || {};
  self.steps = self.steps || {};
  self.views.StepView = Backbone.View.extend({
    el: $(".creditinator-view"),
    continueBtn: $(".continueBtn"),
    backBtn: $(".backBtn"),
    isStepValid: function() {
      return false;
    },
    currentStep: "unknown",
    nextStep: "unknown",
    prevStep: "unknown",
    stepTitle: "Untitled Step",
    stepSubTitle: "",
    events: {
      ".continueBtn click": "moveOn",
      ".backBtn click": "moveBack"
    },
    initialize: function() {
      _.bindAll(this);
      return this.render();
    },
    beforeGoToNext: function() {
      return true;
    },
    goToNext: function() {},
    goToPrev: function() {},
    render: function() {
      return $(this.el).append('');
    }
  });
});
