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
        targetPosition: {x: 1.635976786499171, y: -3.963037058869359, z: 6.2114534499649325},
        cameraPosition: {x: 2.429083440024451, y: 6.140005709778508, z: 15.164381811307525}
      },
      date:"Nov. 23, 1940",
      title: "Romania joins Axis",
      text: "Romania joins Axis side amdist political upheaval"
    }
  }
});

_.defaults(RomaniaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = RomaniaJoinsAxis;
