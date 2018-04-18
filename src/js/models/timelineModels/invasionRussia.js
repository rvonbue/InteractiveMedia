import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let InvasionRussia = BaseTimelineModel.extend({
  defaults:{
    name: "InvasionRussia",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    modelDetails: {
      arrows: [
             {
                start: {x: -0.452, y: 0.2, z: 2.33},
                end: {x: 1.836, y: 0.2, z: -1.34},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
          ]
    },
    historyDetails: {
      eventPositions: {
        targetPosition: {x: 3.76, y: -1.52, z: 0.17},
        cameraPosition: {x: 3.73, y: 15.78, z: 5.50}
      },
      date:"Jun. 22, 1941",
      title: "Germany Attacks Russia. Russia joins Allies",
      text: "Germany invades Russia. Russia joins axis"
    }
  },
    initialize: function () {
      // BaseTimelineModel.prototype.initialize.apply(this, arguments);
      BaseTimelineModel.prototype.initialize.apply(this, arguments);

    },
    startAnimation: function () {
      BaseTimelineModel.prototype.startAnimation.apply(this, arguments);
    }
});

_.defaults(InvasionRussia.prototype.defaults, BaseTimelineModel.prototype.defaults);

module.exports = InvasionRussia;
