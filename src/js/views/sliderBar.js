import eventController from "../controllers/eventController";
import template from "./sliderBar.html";

let SliderBar = Backbone.View.extend({
  className: "slider-bar",
  events: {
    "mouseenter .power-hover": "powerMouseEnter",
    "mouseleave .power-hover": "powerMouseLeave"
  },
  initialize: function (options) {
    this.addListeners();
  },
  powerMouseEnter: function (evt) {
    eventController.trigger(eventController.HOVER_ALL_AXIS_OR_ALLY, $(evt.currentTarget).index() );
  },
  powerMouseLeave: function (evt) {
    eventController.trigger(eventController.UNSET_ALL_HOVER_MODELS);
  },
  addListeners: function () {
  },
  removeListeners: function () {
  },
  render: function () {
    this.$el.append(template);
    return this;
  }
});

module.exports = SliderBar;
