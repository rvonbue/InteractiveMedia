import eventController from "../controllers/eventController";
import {allTimelineModels} from "./timelineModels/timelineModelsCombined";

let TimelineManager = Backbone.Model.extend({
  defaults:{
    currentPosition: 0,
    timeEventModels: allTimelineModels,
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


    if (currentTimeEventExist) this.stopPreviousTimelineModel(); //stop and remove existing timeline from view

    this.set("currentPosition", timePosition);

    if (newTimeEventExist) {
      this.restartExsitingTimeline();
      return;
    };
    if ( timePosition === 0 ) {
        eventController.trigger(eventController.ANIMATE_CAMERA);
        return;
    }

    if (!newTimeEventExist) {
      let timelineModel = this.createTimeEvent(timePosition);
      timelineModel.once("change:ready", ()=> { console.log("This should make start button active"); });
      this.selectTimelineModel(timelineModel);
    }

  },
  restartExsitingTimeline: function () {
    let timelineModel = this.get("timeEvents")[this.get("currentPosition")];
    // this.startTimelineModel(timelineModel);
    this.selectTimelineModel(timelineModel);
  },
  stopPreviousTimelineModel: function () {
    this.stopTimeline();
    eventController.trigger(eventController.LOAD_TIMELINE_MODEL, null);
  },
  selectTimelineModel: function (timelineModel) {
    eventController.trigger(eventController.LOAD_TIMELINE_MODEL, timelineModel.get("historyDetails"));
    eventController.trigger(eventController.SELECT_SCENE_MODELS, timelineModel.get("historyDetails").countries );
    timelineModel.animateCamera();
  },
  startTimelineModel: function (timelineModel) {
    timelineModel = timelineModel ? timelineModel : this.get("timeEvents")[this.get("currentPosition")];
    timelineModel.startAnimation();
  },
  stopTimeline: function (timelineModel) {
    timelineModel = timelineModel ? timelineModel : this.get("timeEvents")[this.get("currentPosition")];
    timelineModel.stopAnimation();
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
