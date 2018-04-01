import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import spitfireModel from "../animatedModels/spitfireModel";
import messerschmittModel from "../animatedModels/messerschmittModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let BritishAirRaid = BaseTimelineModel.extend({
  defaults:{
    name: "britishAirRaid",
    modelUrls:[],
    animatedModels: [messerschmittModel], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    historyDetails: {
      countries: ["germany", "unitedkingdom" ],
      eventPositions: {
          targetPosition: {x: -10.422032314109362, y: -2.767908515571208, z: 3.98483323035648},
          cameraPosition: {x: -11.256251587384604, y: 5.367395621760747, z: 8.780098601818695}
      },
      title: "Battle Of Britain",
      text: "The Battle of Britain was a military campaign of the Second World War, in which the Royal Air Force (RAF) defended the United Kingdom (UK) against large-scale attacks by the German Air Force (Luftwaffe). It has been described as the first major military campaign fought entirely by air forces"
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
  animateCamera: function () {
    eventController.trigger(eventController.ANIMATE_CAMERA, this.get("historyDetails").eventPositions);
  },
  stopAnimation: function () {
    this.animatedModelsCollection.each( ( model )=> {
      model.stopAnimation();
      model.resetPosition();
    });
    this.get("tweens").forEach( (tween)=> { tween.stop(); });
    this.set("tweens", []);
    // this.hideModels();
  },
  hideModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.hide(); });
  },
  showModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.show(); });
  },
  getStartPosition: function (meshGroup, power) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup, power);
  },
  getSpitfireModel: function () {
     return this.animatedModelsCollection.findWhere({ name: "spitfire" });
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
    tween.timelineName = this.get("name");
    this.get("tweens").push(tween);
    return tween;
  },
  isReady: function () {

  }

});

_.defaults(BritishAirRaid.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BritishAirRaid;
