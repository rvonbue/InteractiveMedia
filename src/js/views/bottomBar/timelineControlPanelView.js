import eventController from "../../controllers/eventController";
import template from "./timelineControlPanelView.html";
import { length } from "../../models/timelineModels/timelineModelsCombined";
import utils from "../../components/utils";
let cameraAnimationDuration = utils.getCameraAnimationSpeed().duration;

let timelineControlPanel = Backbone.View.extend({
  className: "timeline-control-panel",
  events: {
    "click .play": "clickPlayTimeline",
    "click .pause": "pauseTimeline"
  },
  initialize: function () {
    _.bindAll(this, "clickPlayTimeline");
  },
  addListeners: function () {
    eventController.on(eventController.TIMELINE_MODEL_ANIMATION_COMPLETE, this.playTimeline, this);
  },
  removeListeners: function () {
    eventController.off(eventController.TIMELINE_MODEL_ANIMATION_COMPLETE, this.playTimeline, this);
  },
  clickPlayTimeline: function () {
    this.$el.addClass("playing");
    this.addListeners();
    this.playTimeline();
  },
  playTimeline: function () {
    console.log("playTimeline");
    eventController.trigger(eventController.NEXT_TIMELINE_MODEL);
    _.delay(()=>{ eventController.trigger(eventController.START_TIMELINE_MODEL); }, cameraAnimationDuration);
  },
  pauseTimeline: function () {
    this.$el.removeClass("playing");
    this.removeListeners();
  },
  render: function () {
    this.$el.append(template({numOfTimelineEvents: length - 1}));
    return this;
  }
});

module.exports = timelineControlPanel;
