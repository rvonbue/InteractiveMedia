import eventController from "../controllers/eventController";
import template from "./sliderBar.html";
import { length } from "../models/timelineModels/timelineModelsCombined";

let SliderBar = Backbone.View.extend({
  className: "slider-bar",
  events: {
    "input": "updateTimelineManager"
  },
  updateTimelineManager: function () {
    eventController.trigger(eventController.TIMELINE_MANAGER_UPDATE, Number(this.$el.find("input").val()));
  },
  render: function () {
    this.$el.append(template({numOfTimelineEvents: length - 1}));
    return this;
  }
});

module.exports = SliderBar;
