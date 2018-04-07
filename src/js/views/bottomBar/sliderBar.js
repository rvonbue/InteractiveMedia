import eventController from "../../controllers/eventController";
import template from "./sliderBar.html";
import { length } from "../../models/timelineModels/timelineModelsCombined";

let SliderBar = Backbone.View.extend({
  className: "slider-bar",
  events: {
    "input": "updateTimelineManager"
  },
  initialize: function () {
    eventController.on(eventController.NEXT_TIMELINE_MODEL, this.nextTimelineModel, this);
  },
  updateTimelineManager: function () {
    eventController.trigger(eventController.TIMELINE_MANAGER_UPDATE, this.getInputValue());
  },
  nextTimelineModel: function () {
    let value = Number(this.$el.find("input").val()) + 1;
    value = value <= length - 1 ? value : value - 1;
    this.$el.find("input").val(value);
    console.log("value", value);
    eventController.trigger(eventController.TIMELINE_MANAGER_UPDATE, value);
  },
  getInputValue: function () {
    return Number(this.$el.find("input").val());
  },
  render: function () {
    this.$el.append(template({numOfTimelineEvents: length - 1}));
    return this;
  }
});

module.exports = SliderBar;
