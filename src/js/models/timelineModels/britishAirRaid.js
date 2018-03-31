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
      countries: ["unitedkingdom", "germany"],
      event: {
          targetPosition: {x: -1.8986, y: 0, z: 1.2249},
          messerschmitt: {
            startPosition: {x: -1.2, y: 0, z: 1.5},
            endPosition: {x: -2.9476, y: 0, z: 0.75}
          },
          text: "Battle Of Britain"
        }
    }
  },
  initAnimation: function () {
    let spitfireModel = this.getSpitfireModel();

    this.animatedModelsCollection.forEach( function (model) {
      let pos = this.getStartPosition(model.get("meshGroup"), model.get("power"));
      model.setInitPosition(pos);
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
    let getCountryPosition = commandController.request(commandController.GET_COUNTRY_MESH, this.get("historyDetails").countries);
    eventController.trigger(eventController.ANIMATE_CAMERA, this.get("historyDetails").event.targetPosition);
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
    // let spitfireModel = this.getSpitfireModel();
    // let finalPos = spitfireModel.get("endPosition");
    // let tween = this.getTween(spitfireModel.get("meshGroup").position, finalPos, this.get("animationDuration"));
    // tween.start();

    this.animatedModelsCollection.each( (model)=> {
      let tween = this.getTween(
        model.getPivot().position,
        model.get("endPosition"),
        this.get("animationDuration")
      );

      tween.start();
    }, this);

  },
  getTween: function (from, to, duration) {
    let tween = new TWEEN.Tween(from, {override:true} )
    .to( to, duration );

    tween.timelineName = this.get("name");
    this.get("tweens").push(tween);
    return tween;
  }
});

_.defaults(BritishAirRaid.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BritishAirRaid;
