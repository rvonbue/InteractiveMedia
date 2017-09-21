import TWEEN from "tween.js";

import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import SceneModelCollection from "../collections/SceneModelCollection";
import ModelLoader from "../models/ModelLoader";
import model3dList from "../data/model3dList";

var SceneLoader = Backbone.Model.extend({
  initialize: function (options) {
    window.sceneModelCollection = this.sceneModelCollection = new SceneModelCollection();
    this.modelLoader = new ModelLoader();
    this.addListeners();

    _.each(model3dList, function (modelsArrObj) {
      eventController.trigger(eventController.LOAD_JSON_MODEL, modelsArrObj); //load scene Models
    }, this);

  },
  addListeners: function () {
     eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
     eventController.on(eventController.ALL_ITEMS_LOADED, this.allSceneModelsLoaded, this );
     eventController.on(eventController.UNSET_ALL_HOVER_MODELS, this.sceneModelHoverSet, this );
     commandController.reply(commandController.GET_SCENE_MODEL, this.getSceneModel, this );
     commandController.reply(commandController.GET_SCENE_MODELS, this.getSceneModels, this );
  },
  removeListeners: function () {
    eventController.off(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.off(eventController.ALL_ITEMS_LOADED, this.allSceneModelsLoaded, this );
    eventController.off(eventController.UNSET_ALL_HOVER_MODELS, this.sceneModelHoverSet, this );
    commandController.stopReplying(commandController.GET_SCENE_MODEL, this.getSceneModel, this );
    commandController.stopReplying(commandController.GET_SCENE_MODELS, this.getSceneModels, this );
  },
  getSceneModels: function (options) {
    return this.sceneModelCollection.where(options);
  },
  getSceneModel: function (options) {
    return this.sceneModelCollection.findWhere(options);
  },
  setInteractiveObjects: function (objects3d) {
    eventController.trigger(eventController.RESET_RAYCASTER, objects3d);
  },
  modelLoaded: function (mesh3d, modelsArrObj) {
    this.addModelSceneCollection(mesh3d, modelsArrObj); //adding to collection returns sceneModel
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [mesh3d]);
  },
  addModelSceneCollection: function (mesh3d, modelsArrObj) {
    let sceneModel = this.sceneModelCollection.add(modelsArrObj);
    sceneModel.set("mesh3d", mesh3d);
  },
  allSceneModelsLoaded: function () {
    eventController.trigger(eventController.RESET_RAYCASTER, this.getAllMesh3d());
  },
  sceneModelHoverSet: function (bool) {
    let hoverSceneModels = this.sceneModelCollection.where({"hover": true});
    _.each(hoverSceneModels, (sm)=>{
      sm.set("hover", bool);
    });
  },
  getAllMesh3d: function () {
    let objects3d = this.sceneModelCollection
    .where({interactive: true})
    .map(function (model) { return model.get('mesh3d'); });

    return objects3d;
  }
});

module.exports = SceneLoader;
