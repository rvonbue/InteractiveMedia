import TWEEN from "tween.js";
import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import spitfireModel from "../animatedModels/spitfireModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let BritishAirRaid = BaseTimelineModel.extend({
  defaults:{
    modelUrls:[],
    animatedModels: [spitfireModel],
    animationDuration: 5000,
  },
  initialize: function () {
    this.animatedModelsCollection = new AnimatedModelCollection();
    this.addListeners();
    this.createModels();
    this.loadAnimatedModels();
  },
  addListeners: function () {
    eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.on(eventController.ALL_ITEMS_LOADED, this.isModelReady, this );
  },
  loadAnimatedModels: function () {
    let modelUrls = [];

    this.animatedModelsCollection.models.forEach( (model)=> {
      modelUrls = [...modelUrls, ...model.getModelUrls()];
    });
    modelUrls.forEach( (modelUrl)=>{
      eventController.trigger(eventController.LOAD_JSON_MODEL, modelUrl);
    });
  },
  createModels: function () {
    let animatedModels = [];

    _.each(this.get("animatedModels"), (model)=> {
      this.animatedModelsCollection.add(new model());
    });
  },
  modelLoaded: function (mesh3d) {
    let name = mesh3d.parentName !== null ? mesh3d.parentName : mesh3d.name;
    let animatedModel = this.animatedModelsCollection.findWhere({ name: name });

    animatedModel.setMesh3d(mesh3d);
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [animatedModel.get("meshGroup")]);
  },
  isModelReady: function () {
    BaseTimelineModel.prototype.isModelReady.apply(this, arguments);

    console.time('someFunction');
    this.startAnimation();
    console.timeEnd('someFunction');
  },
  startAnimation: function () {
    let spitfireModel = this.animatedModelsCollection.findWhere({ name: "spitfire" });
    let offset = this.setStartPosition(spitfireModel);
    offset.x = offset.x * -1;
    this.flyPlaneAcrossScreen(spitfireModel, offset);
  },
  setStartPosition: function (spitfireModel) {
    let meshGroup = spitfireModel.getTestMesh();
    let pos = this.getStartPosition(meshGroup);
    meshGroup.position.set(
      meshGroup.position.x + pos.x,
      meshGroup.position.y + pos.y,
      meshGroup.position.z + pos.z,
    );
    return pos;
  },
  getStartPosition: function (meshGroup) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup);
  },
  flyPlaneAcrossScreen: function (spitfireModel, finalPos) {
    let tween = this.getTween(spitfireModel.get("meshGroup").position, finalPos, this.get("animationDuration"));
    tween.start();
  },
  getTween: function (from, to, duration) {
    return new TWEEN.Tween( from )
    .to( to, duration )
    .repeat( Infinity );
  }
});

module.exports = BritishAirRaid;
