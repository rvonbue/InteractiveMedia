import eventController from "../../controllers/eventController";
import html from "./timelineControlPanelView.html";
import { length } from "../../models/timelineModels/timelineModelsCombined";
import utils from "../../components/utils";
const cameraAnimationDuration = utils.getCameraAnimationSpeed().duration;

let timelineControlPanel = Backbone.View.extend({
  className: "timeline-control-panel audio",
  events: {
    "click .auto-play": "clickAutoPlayTimeline",
    "click .play": "clickPlayTimeline",
    "click .auto-play-pause, .pause": "clickPauseTimeline",
    "click .audio-play, .audio-mute": "clickToggleAudio"
  },
  initialize: function () {
    _.bindAll(this, "clickPlayTimeline","clickPauseTimeline");
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
      play: false,
      audioMute: false
    };
    this.$el.removeClass("auto-playing playing");
  },
  clickAutoPlayTimeline: function () {
    this.$el.addClass("auto-playing");
    this.options.autoplay = true;
    eventController.trigger(eventController.PLAY_AUDIO_SOUNDTRACK, {name: "axis", play: !this.options.audioMute});
    this.playTimeline();
  },
  clickPlayTimeline: function () {
    this.options.play = true;
    this.$el.addClass("playing");
    eventController.trigger(eventController.START_TIMELINE_MODEL);
    eventController.trigger(eventController.PLAY_AUDIO_SOUNDTRACK, {name: "axis", play: !this.options.audioMute});
  },
  resetPlayButton: function () {
    this.$el.removeClass("playing");
    this.options.play = false;
  },
  clickToggleAudio: function () {
    this.options.audioMute = !this.options.audioMute;
    const shouldPlay = !this.options.audioMute && this.$el.hasClass("audio");
    this.$el.toggleClass("audio");
    eventController.trigger(eventController.PLAY_AUDIO_SOUNDTRACK, {name: "axis", play: shouldPlay});
  },
  playTimeline: function () {
    _.delay(() => eventController.trigger(eventController.START_TIMELINE_MODEL), cameraAnimationDuration);
    eventController.trigger(eventController.NEXT_TIMELINE_MODEL);
  },
  clickPauseTimeline: function () {
    this.options.autoplay = this.options.play = false;
    this.$el.removeClass("auto-playing playing");
    eventController.trigger(eventController.PLAY_AUDIO_SOUNDTRACK, {name: "axis", play: false});
  },
  render: function () {
    this.$el.append(html);
    return this;
  }
});

module.exports = timelineControlPanel;
