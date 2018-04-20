import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let RomaniaJoinsAxis = BaseTimelineModel.extend({
  defaults:{
    name: "romaniaJoinsAxis",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 6000,
    modelDetails: {
      flagpole: { "position": {x: 3.686, y: 0.135, z: 9.861}},
      arrows: []
    },
    historyDetails: {
      countries: [
        { name:"rumania", power: 0, invaded: true, silent: false, invasionSpeed: 5000}
      ],
      eventPositions: {
        targetPosition: {x: -0.324677168207853, y: -5.976441993077807, z: 9.253439383848784},
        cameraPosition: {x: 0.14584201852700707, y: 7.7529204035074395, z: 15.235220303286109}
      },
      date:"Nov. 23, 1940",
      title: "Romania joins Axis",
      text: "Romania joins Axis side amdist political upheaval"
    }
  }
});

_.defaults(RomaniaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = RomaniaJoinsAxis;
