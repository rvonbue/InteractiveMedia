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
      countries: [
        { name:"unitedkingdom", power: 1, invaded: false},
        { name:"norway", power: 0, invaded: false, silent: true},
        { name:"latvia", power: 0, invaded: false, silent: true},
        { name:"france", power: 0, invaded: false, silent: true},
        { name:"lithuania", power: 0, invaded: false, silent: true},
        { name:"estonia", power: 0, invaded: false, silent: true},
        { name:"albania", power: 0, invaded: false, silent: true},
        { name:"latvia", power: 0, invaded: false, silent: true},
        { name:"lithuania", power: 0, invaded: false, silent: true},
        { name:"lithuania", power: 0, invaded: false, silent: true},
        { name:"rumania", power: 0, invaded: false, silent: true},
        { name:"bulgaria", power: 0, invaded: false, silent: true},
        { name:"greece", power: 0, invaded: false, silent: true},
        { name:"yugoslovia", power: 0, invaded: false, silent: true}
      ],
      eventPositions: {
        targetPosition: {x: -0.79, y: -2.8, z: 4.3},
        cameraPosition: {x: -0.84, y: 26.1, z: 13.2}
      },
      date:"Apr. 26, 1941",
      title: "fin.",
      text: "By the end of April Hitler and his war machine conquered most of the European Theater"
    }
  }
});

_.defaults(StartTimelineModel.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = StartTimelineModel;
