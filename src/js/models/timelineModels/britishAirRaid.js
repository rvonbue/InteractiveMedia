import TWEEN from "tween.js";
import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import spitfireModel from "../animatedModels/spitfireModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
window.TWEEN = TWEEN;

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
    let spitfireModel = this.animatedModelsCollection.findWhere({ name: "spitfire" });
    let meshGroup = spitfireModel.get("meshGroup");
    let pos = this.getStartPosition(meshGroup);
    spitfireModel.set("initialPosition",{ x: pos.x, y: 1, z: pos.z });
    spitfireModel.set("offsetCenter", { x: pos.x * -1, y: 1, z: pos.z });
    this.flyPlaneAcrossScreen(spitfireModel, { x: pos.x * -1, y: 1, z: pos.z });
  },
  startAnimation: function () {
    let spitfireModel = this.animatedModelsCollection.findWhere({ name: "spitfire" });
    this.setStartPosition(spitfireModel);
    this.animatedModelsCollection.each((model)=> { model.startAnimation(); });
    this.get("tweens").forEach((tween)=> { tween.start(); });
    this.showModels();
  },
  hideModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.hide(); });
  },
  showModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.show(); });
  },
  stopAnimation: function () {
    this.get("tweens").forEach( (tween)=> { tween.stop(); });
    this.animatedModelsCollection.each( ( model )=> { model.stopAnimation(); });
    this.hideModels();
  },
  setStartPosition: function (spitfireModel) {
    let pos = spitfireModel.get("initialPosition");
    spitfireModel.get("meshGroup").position.set(pos.x, pos.y, pos.z);
  },
  getStartPosition: function (meshGroup) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup);
  },
  flyPlaneAcrossScreen: function (spitfireModel, finalPos) {
    let tween = this.getTween(spitfireModel.get("meshGroup").position, finalPos, this.get("animationDuration"));
  },
  getTween: function (from, to, duration) {
    let tween = new TWEEN.Tween(from, {override:true} ).to( to, duration );
    tween.timelineName = this.get("name");
    this.get("tweens").push(tween);
    return tween;
  }
});

_.defaults(BritishAirRaid.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BritishAirRaid;
