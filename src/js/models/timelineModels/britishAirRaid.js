import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import spitfireModel from "../animatedModels/spitfireModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let BritishAirRaid = BaseTimelineModel.extend({
  defaults:{
    name: "britishAirRaid",
    modelUrls:[],
    animatedModels: [spitfireModel], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    initialPostion: null,
    offsetCenter: null
  },
  initAnimation: function () {
    let spitfireModel = this.getSpitfireModel();
    let pos = this.getStartPosition(spitfireModel.get("meshGroup"));
    spitfireModel.setInitPosition(pos);

  },
  startAnimation: function () {
    TWEEN.removeAll();
    this.animatedModelsCollection.each( (model)=> model.startAnimation() );
    this.flyPlaneAcrossScreen();
    this.showModels();
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
  getStartPosition: function (meshGroup) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup);
  },
  getSpitfireModel: function () {
     return this.animatedModelsCollection.findWhere({ name: "spitfire" });
  },
  flyPlaneAcrossScreen: function () {
    let spitfireModel = this.getSpitfireModel();
    let finalPos = spitfireModel.get("offsetCenter");
    let tween = this.getTween(spitfireModel.get("meshGroup").position, finalPos, this.get("animationDuration"));
    tween.start();
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
