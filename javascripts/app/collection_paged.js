// Generated by CoffeeScript 1.3.3
var BackbonePaginator, Collection_paged,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BackbonePaginator = require("backbone.paginator");

BackbonePaginator.clientPager.prototype.whereExpanded = function(attrs) {
  return _.filter(this.origModels, function(model) {
    var key;
    for (key in attrs) {
      if (attrs[key] !== model.get(key)) {
        return false;
      }
    }
    return true;
  });
};

Collection_paged = (function(_super) {

  __extends(Collection_paged, _super);

  function Collection_paged() {}

  return Collection_paged;

})(BackbonePaginator.clientPager);

module.setExports(Collection_paged);
