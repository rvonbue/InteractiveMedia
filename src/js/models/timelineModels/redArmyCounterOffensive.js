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
        targetPosition: {x: -0, y: -2.767908515571208, z: 3.98483323035648},
        cameraPosition: {x: -0, y: 5.367395621760747, z: 8.780098601818695}
      },
      date:"Aug. 28, 1940",
      title: "Red Army Counter Offensive",
      text: "The successful Red Army surprise counter-offensive in front of Moscow, which began on 5 December, was the second most significant battle of the entire war"
    }
  },
  startAnimation: function () {
    TWEEN.removeAll();
    let self = this;
    setTimeout(function () {
      self.animatedModelsCollection.each( (model)=> model.startAnimation() );
      self.flyPlaneAcrossScreen();
      self.showModels();
    }, 50);

  },
  flyPlaneAcrossScreen: function () {

    this.animatedModelsCollection.each( (model)=> {
      let tween = this.getTween(
        model.getPivot().position,
        model.get("endPosition"),
        this.get("animationDuration")
      );
      tween.onComplete(()=> { model.hide(); })
      tween.start();
    }, this);

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
