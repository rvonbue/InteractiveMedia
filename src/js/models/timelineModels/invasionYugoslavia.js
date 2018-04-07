import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let InvasionYugoslaviaGreece = BaseTimelineModel.extend({
  defaults:{
    name: "InvasionYugoslaviaGreece",
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
        { name:"yugoslovia", power: 0, invaded: true, silent: false},
        { name:"greece", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -1.54, y: -6.77, z: 12.56},
        cameraPosition: {x: -0.34, y: 8.216, z: 17.51}
      },
      date:"Apr. 6, 1941",
      title: "Invasion of Yugoslavia & Greece",
      text: "The Germans invaded Greece and Yugoslavia on 6 April 1941, and overran both countries within a month"
    }
  }
});

_.defaults(InvasionYugoslaviaGreece.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = InvasionYugoslaviaGreece;
