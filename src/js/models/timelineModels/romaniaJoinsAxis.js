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
    animationDuration: 5000,
    modelDetails: {
      arrows: [
             {
                start: {x: -5.559, y: 0.2, z: 4.029},
                end: {x: -3.155, y: 0.2, z: 3.477},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             }
          ]
    },
    historyDetails: {
      countries: [
        { name:"rumania", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -0.324677168207853, y: -5.976441993077807, z: 9.253439383848784},
        cameraPosition: {x: 0.14584201852700707, y: 7.7529204035074395, z: 15.235220303286109}
      },
      date:"23 Nov. 1940",
      title: "Romania joins Axis",
      text: "Romania joins Axis side amdist political upheaval"
    }
  }
});

_.defaults(RomaniaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = RomaniaJoinsAxis;
