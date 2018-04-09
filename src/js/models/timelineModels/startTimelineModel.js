import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let StartTimelineModel = BaseTimelineModel.extend({
  defaults:{
    name: "startTimelineModel",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 50,
    historyDetails: {
      countries: [],
      eventPositions: {
        targetPosition: {x: -0.79, y: -2.8, z: 4.3},
        cameraPosition: {x: -0.84, y: 26.1, z: 13.2}
      },
      date:"Apr. 26, 1941",
      title: "World War II",
      text: "The war officially started aggression initiated by Germans"
    }
  }
});

_.defaults(StartTimelineModel.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = StartTimelineModel;
