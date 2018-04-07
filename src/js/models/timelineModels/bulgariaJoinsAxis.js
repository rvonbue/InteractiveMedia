import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let BulgariaJoinsAxis = BaseTimelineModel.extend({
  defaults:{
    name: "bulgariaJoinsAxis",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    modelDetails: {
      arrows: [
             {
                start: {x: -5.559, y: 0.2, z: 4.029},
                end: {x: -3.155, y: 0.2, z: 3.477},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
          ]
    },
    historyDetails: {
      countries: [
        { name:"hungary", power: 0, invaded: false, silent: true},
        { name:"bulgaria", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -1.54, y: -6.77, z: 12.56},
        cameraPosition: {x: -0.34, y: 8.216, z: 17.51}
      },
      date:"1 March 1941",
      title: "Bulgaria joins Axis",
      text: "Under pressure from Germany Bulgaria signed the Tripartite pact to permit German forces to pass through Bulgaria to attack Greece in order to help Italy."
    }
  }
});

_.defaults(BulgariaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BulgariaJoinsAxis;
