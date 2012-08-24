// Generated by CoffeeScript 1.3.3

ce.module("activity.participants", function(self, ce, Backbone, Marionette, $, _) {
  return self.Row = Backbone.View.extend({
    initialize: function() {
      this.model.on("change:ISSELECTED", this.determineSelectedStatus, this);
      this.model.on("change:FIRSTNAME change:LASTNAME", this.setFullName, this);
      self.on("participant_reset participant_md_toggled participant_status_updated", this.render, this);
      self.on("participant_removed", this.remove, this);
    },
    tagName: "tr",
    className: "personRow AllAttendees js-all-attendee",
    template: "activity_participants-row",
    bindViews: function() {
      var attributesToPass, statusDateEl;
      statusDateEl = this.$el.find(".js-status-date");
      attributesToPass = {
        ID: this.model.get("ID"),
        STATUSID: this.model.get("STATUSID"),
        PARENTSTATUSID: this.model.get("STATUSID"),
        COMPLETEDATE: Date(this.model.get("COMPLETEDATE")),
        STATUSNAME: this.model.get("NAME"),
        REGISTERDATE: Date(this.model.get("REGISTERDATE")),
        TERMDATE: Date(this.model.get("TERMDATE"))
      };
    },
    events: {
      "click .js-delete-link": "deleteRow",
      "change .js-participant-checkbox": "selectRow",
      "click .js-print-cme": "printCME",
      "click .js-print-cne": "printCNE",
      "click .js-remove-user": "removeUser",
      "click .js-reset-user": "resetUser",
      "click .js-toggle-md": "toggleMD"
    },
    determineSelectedStatus: function() {
      if (this.model.get("ISSELECTED")) {
        this.markSelected();
      } else {
        this.markUnselected();
      }
    },
    deleteRow: function() {
      model.destroy({
        wait: true,
        success: function(model) {}
      });
      self.trigger("participant_removed");
    },
    markSelected: function() {
      this.$el.find(".js-participant-checkbox").attr("checked", true);
      this.$el.addClass("alert-info");
    },
    markUnselected: function() {
      this.$el.find(".js-participant-checkbox").attr("checked", false);
      this.$el.removeClass("alert-info");
    },
    printCME: function() {
      var certContent;
      self.certContainer.empty();
      certContent = $.ajax({
        url: "/reports/cmecert",
        type: "post",
        data: {
          selectedattendees: this.model.id
        },
        dataType: "json",
        success: function(data) {
          self.certContainer.html(data);
        },
        error: function() {
          self.certContainer.html("FUCK SAKE, MATE");
        }
      });
      self.certContainer.dialog("show");
    },
    printCNE: function() {
      var certContent;
      self.certContainer.empty();
      certContent = $.ajax({
        url: "/reports/cnecert",
        type: "post",
        data: {
          selectedattendees: this.model.id
        },
        dataType: "json",
        success: function(data) {
          self.certContainer.html(data);
        },
        error: function() {
          self.certContainer.html("FUCK SAKE, MATE");
        }
      });
      self.certContainer.dialog("show");
    },
    render: function() {
      var _temp;
      this.$el.empty();
      _temp = _.template(ce.templates.get(this.template));
      this.$el.append(_temp(this.model.toJSON()));
      if (this.model.get("ISSELECTED")) {
        this.markSelected();
      }
      this.bindViews();
      return this;
    },
    removeUser: function() {
      var curr;
      curr = this;
      if (confirm("Are you sure you want to remove " + this.model.get("FIRSTNAME") + " " + this.model.get("LASTNAME") + " from the activity?")) {
        this.model.destroy({
          wait: true,
          success: function(model) {
            self.trigger("participant_removed", model);
          }
        });
      }
    },
    resetUser: function() {
      var updatedValues;
      if (confirm("Are you sure you want to reset the participant information for " + this.model.get("FIRSTNAME") + " " + this.model.get("LASTNAME"))) {
        updatedValues = {
          NAME: "Registered",
          STATUSID: 3,
          COMPLETEDATE: "",
          TERMDATE: ""
        };
        if (confirm("Do you want to clear all payment information regarding " + this.model.get("FIRSTNAME") + " " + this.model.get("LASTNAME") + " for this activity?")) {
          updatedValues.PAYMENTFLAG = "N";
          updatedValues.PAYMENTAMOUNT = "";
          updatedValues.PAYORDERNO = "";
          updatedValues.PAYMENTDATE = "";
        }
        this.model.save(updatedValues, {
          success: function() {
            return self.trigger("participant_reset");
          }
        });
      }
    },
    selectRow: function(e) {
      if (this.$el.find(".js-participant-checkbox").is(":checked")) {
        this.$el.addClass("alert-info");
        this.model.set({
          "ISSELECTED": true,
          silent: true
        });
      } else {
        this.$el.removeClass("alert-info");
        this.model.set({
          "ISSELECTED": false,
          silent: true
        });
        if (typeof this.model.collection.filterFields !== "undefined") {
          if (this.model.collection.filterFields[0] === "ISSELECTED") {
            self.trigger("page_reload");
          }
        }
      }
      ce.ui.trigger("row_selected");
    },
    setFullName: function() {
      this.model.set({
        "FULLNAME": this.model.get("FIRSTNAME") + " " + this.model.get("LASTNAME")
      });
    },
    toggleMD: function() {
      var curr, newMDFlag;
      curr = this;
      if (this.model.get("MDFLAG").toUpperCase() === "Y") {
        newMDFlag = "N";
      } else {
        newMDFlag = "Y";
      }
      this.model.save({
        MDFLAG: newMDFlag
      }, {
        success: function() {
          return self.trigger("participant_md_toggled");
        }
      });
    }
  });
});
