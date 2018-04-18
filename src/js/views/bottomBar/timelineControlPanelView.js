import eventController from "../../controllers/eventController";
import template from "./timelineControlPanelView.html";
import { length } from "../../models/timelineModels/timelineModelsCombined";
import utils from "../../components/utils";
const cameraAnimationDuration = utils.getCameraAnimationSpeed().duration;

let timelineControlPanel = Backbone.View.extend({
  className: "timeline-control-panel",
  events: {
    "click .auto-play": "clickAutoPlayTimeline",
    "click .play": "clickPlayTimeline",
    "click .pause": "clickPauseTimeline",
    "click .auto-play-pause": "clickAutoPlayPauseTimeline"
  },
  initialize: function () {
    _.bindAll(this, "clickPlayTimeline", "clickAutoPlayPauseTimeline", "clickAutoPlayPauseTimeline", "clickPauseTimeline");
    this.resetControls();
    eventController.on(eventController.TIMELINE_MODEL_ANIMATION_COMPLETE, this.updateControls, this);
    eventController.on(eventController.TIMELINE_MANAGER_END, this.clickPauseTimeline, this);
    eventController.on(eventController.SLIDER_BAR_UPDATE, this.resetControls, this);
  },
  updateControls: function () {
    if ( this.options.autoplay) this.playTimeline();
    if ( this.options.play) this.resetPlayButton();
  },
  resetControls: function () {
    this.options = {
      autoplay: false,
      play: false
    };
    this.$el.removeClass("auto-playing playing");
  },
  clickAutoPlayTimeline: function () {
    this.$el.addClass("auto-playing");
    this.options.autoplay = true;
    this.playTimeline();
  },
  clickAutoPlayPauseTimeline: function () {
    // this.options.autoplay = false;
    this.$el.removeClass("auto-playing");
  },
  clickPlayTimeline: function () {
    this.options.play = true;
    this.$el.addClass("playing");
    eventController.trigger(eventController.START_TIMELINE_MODEL);
  },
  resetPlayButton: function () {
    this.$el.removeClass("playing");
    this.options.play = false;
  },
  playTimeline: function () {
    eventController.trigger(eventController.NEXT_TIMELINE_MODEL);
    _.delay(() => eventController.trigger(eventController.START_TIMELINE_MODEL), cameraAnimationDuration);
  },
  clickPauseTimeline: function () {
    this.options.play = false;
    this.$el.removeClass("playing");
  },
  render: function () {
    this.$el.append(template({numOfTimelineEvents: length - 1}));
    return this;
  }
});

module.exports = timelineControlPanel;
