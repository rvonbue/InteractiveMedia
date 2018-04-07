import eventController from "../controllers/eventController";
import template from "./axisAlly.html";

let axisAlly = Backbone.View.extend({
  className: "country-pane-hover",
  events: {
    "mouseenter .axis-ally-hover": "powerMouseEnter",
    "mouseleave .axis-ally-hover": "powerMouseLeave"
  },
  powerMouseEnter: function (evt) {
    eventController.trigger(eventController.HOVER_ALL_AXIS_OR_ALLY, $(evt.currentTarget).index(".axis-ally-hover") );
  },
  powerMouseLeave: function (evt) {
    eventController.trigger(eventController.UNSET_ALL_HOVER_MODELS);
  },
  render: function () {
    this.$el.append(template);
    return this;
  }
});

module.exports = axisAlly;
