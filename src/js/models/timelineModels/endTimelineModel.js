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
      eventPositions: {
        targetPosition: {x: -0.79, y: -2.8, z: 4.3},
        cameraPosition: {x: -0.84, y: 26.1, z: 13.2}
      },
      date:"Jun. 25, 1941",
      title: "fin.",
      text: "By the end of April Hitler and his war machine conquered most of the European Theater"
    }
  }
});

_.defaults(StartTimelineModel.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = StartTimelineModel;
