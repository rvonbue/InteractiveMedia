import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let RedArmyCounterOffensive = BaseTimelineModel.extend({
  defaults:{
    name: "redArmyCounterOffensive",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    historyDetails: {
      countries: ["germany", "russia" ],
      eventPositions: {
        targetPosition: {x: 0.837, y: -1.508, z: 1.817},
        cameraPosition: {x: 1.441, y: 11.0223, z: 10.010}
      },
      date:"Dec. 5, 1941",
      title: "Red Army Counter Offensive",
      text: "The successful Red Army surprise counter-offensive in front of Moscow, which began on 5 December, was the second most significant battle of the entire war"
    }
  },
  startAnimation: function () {
    TWEEN.removeAll();

  },
  flyPlaneAcrossScreen: function () {

    this.animatedModelsCollection.each( (model)=> { }, this);

  },
  getTween: function (from, to, duration) {
    let tween = new TWEEN.Tween(from, {override:true} )
    .to( {x:[to.x], y:[from.y, 0.45, to.y], z: [to.z]}, duration );
     // fly up dive bomb
    return tween;
  }
});

_.defaults(RedArmyCounterOffensive.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = RedArmyCounterOffensive;
