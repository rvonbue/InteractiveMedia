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
    animatedModels: [messerschmittModel, spitfireModel], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    historyDetails: {
      countries: ["unitedkingdom", "germany"],
      eventPositions: {
          targetPosition: {x: -1.898, y: 0, z: 1.2249},
          cameraPosition: {x: -2.016, y: 1.086, z: 2.018},
          messerschmitt: {
            startPosition: {x: -1, y: 0.15, z: 1.5},
            endPosition: {x: -2.9476, y: 0.075, z: 0.75}
          },
          spitfire: {
            startPosition: {x: -2.9476, y: 0.075, z: 0.75},
            endPosition: {x: -1, y: 0.15, z: 1.5}
          },
          text: "Battle Of Britain"
        }
    }
  },
  initAnimation: function () {

    this.animatedModelsCollection.forEach( function (model) {
      let pos = this.getStartPosition(model.get("meshGroup"), model.get("power"));
      model.setInitPosition(this.get("historyDetails").eventPositions[model.get("name")]);
    }, this);

  },
  startAnimation: function () {
    TWEEN.removeAll();
    this.setCamera();
    this.animatedModelsCollection.each( (model)=> model.startAnimation() );
    this.flyPlaneAcrossScreen();
    this.showModels();
  },
  setCamera: function () {
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
  }
});

_.defaults(BritishAirRaid.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BritishAirRaid;
