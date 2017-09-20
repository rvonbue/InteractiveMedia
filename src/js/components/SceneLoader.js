import TWEEN from "tween.js";

import eventController from "../controllers/eventController";
import SceneModelCollection from "../collections/SceneModelCollection";
import ModelLoader from "../models/ModelLoader";

var SceneLoader = Backbone.View.extend({
  initialize: function (options) {
    this.sceneModelCollection = new SceneModelCollection();
    this.modelLoader = new ModelLoader();
    this.addListeners();
    
    let urlBase = "models3d/";
    let models = [
      // { name: "mapground" },
      { name: "albania" },
      { name: "belgium" },
      { name: "bulgaria" },
      { name: "denmark" },
      { name: "estonia" },
      { name: "eastprussia" },
      { name: "finland" },
      { name: "france" },
      { name: "germany" },
      { name: "greece" },
      { name: "hungary" },
      { name: "ireland" },
      { name: "italy" },
      { name: "latvia" },
      { name: "lithuania" },
      { name: "netherlands" },
      { name: "norway" },
      { name: "poland" },
      { name: "portugal" },
      { name: "rumania" },
      { name: "russia" },
      { name: "spain" },
      { name: "switzerland" },
      { name: "sweden" },
      { name: "unitedkingdom" },
      { name: "yugoslovia" }
    ];

    _.each(models, function (modelsArrObj) {
      eventController.trigger(eventController.LOAD_JSON_MODEL, urlBase +  modelsArrObj.name + ".json", modelsArrObj.name ); //load scene Models
    }, this);

  },
  addListeners: function () {
     eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
     eventController.on(eventController.BUILD_SCENE_DETAILS, this.buildSceneDetails, this );
     eventController.once(eventController.ALL_ITEMS_LOADED, this.animateSceneStart, this);
  },
  removeListeners: function () {
    eventController.off(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.off(eventController.BUILD_SCENE_DETAILS, this.buildSceneDetails, this );
  },
  startLoadSceneDetails: function (sceneModel) {
    eventController.trigger(eventController.RESET_RAYCASTER, []);   //reset Interactive objects to nothing will loading new ones
    this.setSceneDetails(sceneModel);
  },
  allItemsLoaded: function (sceneModel) {
    sceneModel.get("sceneDetails").showHide(false , false);
    sceneModel.set({ loading: false, ready: true });
    eventController.trigger(eventController.SCENE_MODEL_READY, sceneModel);
  },
  getSceneModelInteractiveObjects: function () {
    let objects3d = this.sceneModelCollection
    .where({interactive: true})
    .map(function (model) { return model.get('rayCasterMesh'); });
    return objects3d;
  },
  setInteractiveObjects: function (objects3d) {
    eventController.trigger(eventController.RESET_RAYCASTER, objects3d);
  },
  addNonInteractive: function (obj) {
    obj.interactive = false;
    let sceneModel = this.sceneModelCollection.add(obj); //adding to collection returns sceneModel
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [sceneModel.get("object3d")]);
  },
  sceneModelLoaded: function (obj) {
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [obj]);
  },
  modelLoaded: function (obj) {
    this.sceneModelLoaded(obj);
  }
});

module.exports = SceneLoader;
