import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let InvasionDenmarkNorway = BaseTimelineModel.extend({
  defaults:{
    name: "invasionDenmarkNorway",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 3000,
    historyDetails: {
      countries: [
        { name:"germany", power: 0, invaded: false},
        { name:"poland", power: 0, invaded: true, silent: true},
        { name:"denmark", power: 0, invaded: true, silent: false},
        { name:"norway", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -5.796420919354056, y: -0.44450000246956584, z: 0.6950310642545552},
        cameraPosition: {x: -5.309301085210331, y: 8.762156273758878, z: 5.64300918980749}
      },
      date:"Apr. 9, 1940",
      title: "Invasion of Denmark and Norway",
      text: "Germany invaded Denmark and Norway to secure Iron Ore they need to feed the war machine."
    },
    modelDetails: {
      arrows: [
             {
                start: {x: -8.47, y: 0.25, z: 3.29},
                end: {x: -7.89, y: 0.25, z: 0.27},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -6.056, y: 0.25, z: 2.90},
                end: {x: -7.31, y: 0.25, z: 0.44},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -7.616977368418977, y: 0.25, z: 0.12693489866170804},
                end: {x: -8.434940106619548, y: 0.25, z: -3.307052414140552},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT,
                animationDelay: 1000
             },
             {
                start:  {x: -7.125991461207927, y: 0.25, z: -0.04105199740639276},
                end: {x: -6.895916123669293, y: 0.25, z: -4.713340500693563},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT,
                animationDelay: 1250
             }]
    }
  }
});

_.defaults(InvasionDenmarkNorway.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = InvasionDenmarkNorway;
