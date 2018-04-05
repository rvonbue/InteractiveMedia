import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let InvasionDenmarkNorway = BaseTimelineModel.extend({
  defaults:{
    name: "invasionDenmarkNorway",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
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
    }
  }
});

_.defaults(InvasionDenmarkNorway.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = InvasionDenmarkNorway;
