import eventController from "../controllers/eventController";
import BritishAirRaid from "./timelineModels/britishAirRaid";

let TimelineManager = Backbone.Model.extend({
  defaults:{
    currentPosition: 0,
    timeEventModels: [
      null,
      BritishAirRaid,
    ],
    timeEvents: {}
  },
  initialize: function () {
    this.addListeners();
    // setTimeout(()=> {
    //   this.updateTimeline(1);
    // },2000);
  },
  addListeners: function () {
    eventController.on(eventController.TIMELINE_MANAGER_UPDATE, this.updateTimeline, this);
    eventController.on(eventController.START_TIMELINE_MODEL, this.startTimelineModel, this);
  },
  doesTimeEventExist: function (timePosition) {
    return this.get("timeEvents")[timePosition] ? true : false;
  },
  updateTimeline: function (timePosition) {
    let currentTimeEventExist = this.doesTimeEventExist(this.get("currentPosition"));
    let newTimeEventExist = this.doesTimeEventExist(timePosition);

    if (currentTimeEventExist) this.stopTimeline();
    this.set("currentPosition", timePosition);

    if (!newTimeEventExist && timePosition === 1 ) {
      let timelineModel = this.createTimeEvent(timePosition);
      timelineModel.once("change:ready", ()=> { console.log("This should make start button active"); });
      eventController.trigger(eventController.LOAD_TIMELINE_MODEL, timelineModel.get("historyDetails"));
      timelineModel.animateCamera();
      eventController.trigger(eventController.SELECT_SCENE_MODELS, timelineModel.get("historyDetails").countries );
    }

  },
  // loadTimeline: function () {
  //   let timelineModel = this.get("timeEvents")[this.get("currentPosition")];
  //   eventController.trigger(eventController.LOAD_TIMELINE_MODEL, timelineModel);
  //   timelineModel.startAnimation();
  // },
  startTimelineModel: function () {
    let timelineModel = this.get("timeEvents")[this.get("currentPosition")];
    timelineModel.startAnimation();
    console.log("jsdhafjkashdjfhsajf haskdjhfkdajdjdjdshhsdk jh ")
  },
  stopTimeline: function () {
    this.get("timeEvents")[this.get("currentPosition")].stopAnimation();
  },
  createTimeEvent: function (timePosition) {
    let timeEvents = this.get("timeEvents");
    let BaseTimelineModel = this.get("timeEventModels")[timePosition];
    timeEvents[timePosition] =  new BaseTimelineModel();
    this.set("timeEvents", timeEvents);
    return timeEvents[timePosition];
  }
});

module.exports = TimelineManager;
