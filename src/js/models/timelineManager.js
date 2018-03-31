import eventController from "../controllers/eventController";
import BritishAirRaid from "./timelineModels/britishAirRaid";

let TimelineManager = Backbone.Model.extend({
  defaults:{
    currentPosition: 0,
    timeEventModels: [
      BritishAirRaid,
    ],
    timeEvents: {}
  },
  initialize: function () {
    this.addListeners();
    setTimeout(()=> {
      this.updateTimeline(0);
    },2000);
  },
  addListeners: function () {
    eventController.on(eventController.TIMELINE_MANAGER_UPDATE, this.updateTimeline, this);
  },
  doesTimeEventExist: function (timePosition) {
    return this.get("timeEvents")[timePosition] ? true : false;
  },
  updateTimeline: function (timePosition) {
    let currentTimeEventExist = this.doesTimeEventExist(this.get("currentPosition"));
    let newTimeEventExist = this.doesTimeEventExist(timePosition);

    if (currentTimeEventExist) this.stopTimeline();
    console.log("timePosition", timePosition);
    this.set("currentPosition", timePosition);
    if (!newTimeEventExist && timePosition === 0 ) {
      this.createTimeEvent(timePosition);
    } else if (newTimeEventExist && timePosition === 0 ) {
      this.startTimeline();
    } else {

    }

  },
  startTimeline: function () {
    this.get("timeEvents")[this.get("currentPosition")].startAnimation();
  },
  stopTimeline: function () {
    this.get("timeEvents")[this.get("currentPosition")].stopAnimation();
  },
  createTimeEvent: function (timePosition) {
    let timeEvents = this.get("timeEvents");
    let BaseTimelineModel = this.get("timeEventModels")[timePosition];
    timeEvents[timePosition] =  new BaseTimelineModel();
    this.set("timeEvents", timeEvents);
  }
});

module.exports = TimelineManager;
