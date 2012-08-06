// Generated by CoffeeScript 1.3.3

ce.module("user", function(self, ce, Backbone, Marionette, $, _) {
  self.on("loggedIn", function() {
    return ce.log.info("user: logged in");
  });
  self.on("loggedOut", function() {
    return ce.log.warn("user: logged out");
  });
  return self.on("loaded", function() {
    return ce.log.info("user: loaded");
  });
});
