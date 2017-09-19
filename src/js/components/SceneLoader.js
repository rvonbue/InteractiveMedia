import THREE from "three";
import TWEEN from "tween.js";

import eventController from "../controllers/eventController";
// import navigationList from "../../data/navigationList";
import SceneModelCollection from "../collections/SceneModelCollection";
import ModelLoader from "../models/ModelLoader";
// import utils from "../components/utils";

var SceneLoader = Backbone.View.extend({
  initialize: function (options) {
    this.sceneModelCollection = new SceneModelCollection();
    this.modelLoader = new ModelLoader();
    this.addListeners();
    let models = [
      // { url: "models3d/europe.json", name: "europe" },
      { url: "models3d/portugal.json", name: "portugal" },
      { url: "models3d/spain.json", name: "spain" },
      { url: "models3d/france.json", name: "france" }
    ];

    _.each(models, function (modelsArrObj) {
      eventController.trigger(eventController.LOAD_JSON_MODEL, modelsArrObj.url, modelsArrObj.name ); //load scene Models
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
    var objects3d = this.sceneModelCollection
    .where({interactive: true})
    .map(function (model) { return model.get('rayCasterMesh'); });
    return objects3d;
  },
  setInteractiveObjects: function (objects3d) {
    eventController.trigger(eventController.RESET_RAYCASTER, objects3d);
  },
  addNonInteractive: function (obj) {
    obj.interactive = false;
    var sceneModel = this.sceneModelCollection.add(obj); //adding to collection returns sceneModel
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [sceneModel.get("object3d")]);
  },
  sceneModelLoaded: function (obj) {

    // var object3dArr = this.sceneModelCollection.where({ interactive: true })
    // .map(function (scModel, i) { // position floors on top of each other
    //   var object3d = scModel.get("object3d");
    //   // object3d.position.set(0, i * scModel.getSize().h + 14.75, 0); //TODO: MAGIC NUMBER its the height of the bottom floor
    //   return object3d;
    // });
    console.log('obj', obj);

    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [obj]);
    // this.setInteractiveObjects(this.getSceneModelInteractiveObjects());
  },

  modelLoaded: function (obj) {
    console.log('modelLoaded', obj);
    this.sceneModelLoaded(obj);
    // if (obj.name === this.SCENE_MODEL_NAME) {
    //   this.sceneModelLoaded(obj);
    // } else {this.sceneModelLoaded(obj);
    //   this.addNonInteractive(obj);
    // }
  }
});

module.exports = SceneLoader;
