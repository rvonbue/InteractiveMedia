import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let ItalyAlbaniaJoinsAxis = BaseTimelineModel.extend({
  defaults:{
    name: "italyAlbaniaJoinsAxis",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 2000,
    historyDetails: {
      countries: [
        { name:"italy", power: 0, invaded: true, silent: false},
        { name:"albania", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -4.4520841521091405, y: -7.490935873153017, z: 13.535923446935033},
        cameraPosition: {x: -4.265773147992161, y: 10.348847621719013, z: 18.833682794289064}
      },
      date:"Jun. 10 1940",
      title: "Italy Albania joins Axis",
      text: "After the fall of France facist Italy joins the war"
    }
  },
  startAnimation: function () {
    BaseTimelineModel.prototype.startAnimation.apply(this, arguments);
    this.animateFlagPole();
  },
  animateFlagPole: function () {

  }
});

_.defaults(ItalyAlbaniaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = ItalyAlbaniaJoinsAxis;
