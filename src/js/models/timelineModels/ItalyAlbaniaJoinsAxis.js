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
        targetPosition:  {x: -4.600048023448743, y: -4.773534336107032, z: 9.441719898207875},
        cameraPosition:  {x: -3.9105547913902665, y: 6.004131147163015, z: 20.07882747099204}
      },
      date:"Jun. 10 1940",
      title: "Italy Albania joins Axis",
      text: "After the fall of France facist Italy joins the war"
    }
  }
});

_.defaults(ItalyAlbaniaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = ItalyAlbaniaJoinsAxis;
