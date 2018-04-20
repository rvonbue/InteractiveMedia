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
    animationDuration: 5000,
    modelDetails: {
      flagpole: { "position": {x: -4.350654225887182, y: 0.14273291744144823, z: 14.798987595289432}},
      arrows: []
    },
    historyDetails: {
      countries: [
        { name:"italy", power: 0, invaded: true, silent: false, invasionSpeed: 10000},
        { name:"albania", power: 0, invaded: true, silent: false, invasionSpeed: 10000}
      ],
      eventPositions: {
        targetPosition:  {x: -3.560305652986994, y: -7.10822409765946, z: 12.336295922213042},
        cameraPosition:  {x: -3.343181488391319, y: 7.138979917963304, z: 19.517912044415517}
      },
      date:"Jun. 10 1940",
      title: "Italy Albania joins Axis",
      text: "After the fall of France facist Italy joins the war"
    }
  }
});

_.defaults(ItalyAlbaniaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = ItalyAlbaniaJoinsAxis;
