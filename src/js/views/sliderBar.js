import eventController from "../controllers/eventController";
import template from "./sliderBar.html";

let SliderBar = Backbone.View.extend({
  className: "slider-bar",
  events: {
    "mouseenter .power-hover": "powerMouseEnter",
  },
  initialize: function (options) {
    this.addListeners();
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
