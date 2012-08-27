// Generated by CoffeeScript 1.3.3

ce.module("utils", function(self, ce, Backbone, Marionette, $, _) {
  self.isBlank = function(str) {
    return !str || /^\s*$/.test(str);
  };
  self.template = function(tmpl) {
    return ce.templates.get(tmpl);
  };
  ce = $.extend(ce, self);
});