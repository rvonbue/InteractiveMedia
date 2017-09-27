import eventController from "../controllers/eventController";
import BritishAirRaid from "./timelineModels/britishAirRaid";

let TimelineManager = Backbone.Model.extend({
  defaults:{
    position: 1,
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
    this.set("position", timePosition);

    if (!this.doesTimeEventExist(timePosition)) {
      let timeEvents = this.get("timeEvents");
      let timeEventModel = this.get("timeEventModels")[timePosition];
      timeEvents[timePosition] =  new timeEventModel();
      this.set("timeEvents", timeEvents);
    }
  }
});

module.exports = TimelineManager;
