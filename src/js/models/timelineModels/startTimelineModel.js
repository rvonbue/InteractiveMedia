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
        targetPosition: {x: -2.336991143750445, y: -2.153566862780448, z: 3.0383154047995986},
        cameraPosition: {x: -1.732991143750445, y: 10.376733137219553, z: 11.2313154047996}
      },
      date:"Sept. 1, 1939",
      title: "World War II",
      text: "The war officially started aggression initiated by Germans"
    }
  }
});

_.defaults(StartTimelineModel.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = StartTimelineModel;
