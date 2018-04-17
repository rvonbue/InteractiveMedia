import eventController from "../../controllers/eventController";
import template from "./sliderBar.html";
import { length } from "../../models/timelineModels/timelineModelsCombined";

let SliderBar = Backbone.View.extend({
  className: "slider-bar demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-8",
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
    if (value <= length - 1) {
      this.$el.find("input").val(value);
      eventController.trigger(eventController.TIMELINE_MANAGER_UPDATE, value);
      // if(value === length - 1) eventController.trigger(eventController.TIMELINE_MANAGER_END);
    }

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
