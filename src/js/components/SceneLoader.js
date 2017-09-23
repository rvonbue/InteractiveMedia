import TWEEN from "tween.js";
// import fs from "fs";

import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import SceneModelCollection from "../collections/SceneModelCollection";
import ModelLoader from "../models/ModelLoader";
import model3dList from "../data/model3dList";
import convert from 'xml-js';
// var json = require('fs').readFileSync('test.json', 'utf8');

var SceneLoader = Backbone.Model.extend({
  initialize: function (options) {
    _.bindAll(this, "addModelsToScene");
    window.sceneModelCollection = this.sceneModelCollection = new SceneModelCollection();
    this.modelLoader = new ModelLoader();
    this.scene = options.scene;
    this.addListeners();

    _.each(model3dList, function (modelsArrObj) {
      eventController.trigger(eventController.LOAD_JSON_MODEL, modelsArrObj); //load scene Models
    }, this);
    // console.log("fs", fs);
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
    this.addModelsToScene([ mesh3d ]);
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
    _.each(hoverSceneModels, ( sm )=> { sm.set("hover", bool); });
  },
  getAllMesh3d: function () {
    let objects3d = this.sceneModelCollection
    .where({interactive: true})
    .map(function (model) { return model.get('mesh3d'); });

    return objects3d;
  },
  addModelsToScene: function (sceneModelArray) {
    _.each(sceneModelArray, function (object3d) { this.scene.add(object3d); }, this);
  },
  removeModelsFromScene: function (modelArray) {
    _.each(modelArray, function (object3d) {
      this.scene.add(object3d);
    }, this);
  },
  addListeners: function () {
     eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
     eventController.on(eventController.ALL_ITEMS_LOADED, this.allSceneModelsLoaded, this );
     eventController.on(eventController.UNSET_ALL_HOVER_MODELS, this.sceneModelHoverSet, this );
     commandController.reply(commandController.GET_SCENE_MODEL, this.getSceneModel, this );
     commandController.reply(commandController.GET_SCENE_MODELS, this.getSceneModels, this );
     eventController.on(eventController.ADD_MODEL_TO_SCENE, this.addModelsToScene);
     eventController.on(eventController.REMOVE_MODEL_FROM_SCENE, this.removeModelsFromScene);
  }
});

module.exports = SceneLoader;
