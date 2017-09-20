import TWEEN from "tween.js";

import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import SceneModelCollection from "../collections/SceneModelCollection";
import ModelLoader from "../models/ModelLoader";
import model3dList from "../data/model3dList";

var SceneLoader = Backbone.Model.extend({
  initialize: function (options) {
    this.sceneModelCollection = new SceneModelCollection();
    this.modelLoader = new ModelLoader();
    this.addListeners();

    let urlBase = "models3d/";

    _.each(model3dList, function (modelsArrObj) {
      eventController.trigger(eventController.LOAD_JSON_MODEL, urlBase +  modelsArrObj.name + ".json", modelsArrObj.name ); //load scene Models
    }, this);

  },
  addListeners: function () {
     eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
     eventController.on(eventController.ALL_ITEMS_LOADED, this.allSceneModelsLoaded, this );
     eventController.on(eventController.UNSET_ALL_HOVER_MODELS, this.sceneModelHoverSet, this );
     commandController.reply(commandController.GET_SCENE_MODEL, this.getSceneModel, this );
  },
  removeListeners: function () {
    eventController.off(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.off(eventController.ALL_ITEMS_LOADED, this.allSceneModelsLoaded, this );
    eventController.off(eventController.UNSET_ALL_HOVER_MODELS, this.sceneModelHoverSet, this );
    commandController.stopReplying(commandController.GET_SCENE_MODEL, this.getSceneModel, this );
  },
  getSceneModel: function (raycastObj) {
    return this.sceneModelCollection.findWhere({ name: raycastObj.object.name });
  },
  setInteractiveObjects: function (objects3d) {
    eventController.trigger(eventController.RESET_RAYCASTER, objects3d);
  },
  modelLoaded: function (obj) {
    this.addModelSceneCollection(obj); //adding to collection returns sceneModel
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [obj]);
  },
  addModelSceneCollection: function (obj) {
    // console.log("this.sceneModelCollection", sceneModel);
    this.sceneModelCollection.add({
      "mesh3d": obj,
      "name": obj.name
    });
  },
  allSceneModelsLoaded: function () {
    eventController.trigger(eventController.RESET_RAYCASTER, this.getAllMesh3d());
  },
  sceneModelHoverSet: function (bool) {
    let hoverSceneModels = this.sceneModelCollection.where({"hover": true});
    console.log("hoverSceneModels:", hoverSceneModels);
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
