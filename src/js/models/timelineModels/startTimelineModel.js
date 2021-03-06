import eventController from "../../controllers/eventController";
import BaseTimelineModel from "./BaseTimelineModel";

let StartTimelineModel = BaseTimelineModel.extend({
  defaults:{
    name: "startTimelineModel",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 10000,
    historyDetails: {
      countries: [],
      eventPositions: {
        targetPosition: {x: -0.79, y: -2.8, z: 4.3},
        cameraPosition: {x: -0.84, y: 26.1, z: 13.2}
      },
      date:"Aug. 27, 1939",
      title: "World War II: European Theater",
      text: "The war officially started aggression initiated by Germans"
    }
  },
  startAnimation: function () {
    // eventController.trigger(eventController.SELECT_SCENE_MODELS, []);
    eventController.trigger(eventController.SHOW_ALL_FLAGS);

    this.animationTimer = setTimeout(function () {
        eventController.trigger(eventController.TIMELINE_MODEL_ANIMATION_COMPLETE);
    }, this.get("animationDuration"));
  }
});

_.defaults(StartTimelineModel.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = StartTimelineModel;
