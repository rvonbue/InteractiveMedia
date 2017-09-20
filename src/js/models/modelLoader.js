import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController"
import THREE from "three";
import MaterialLibrary from "./MaterialLibrary";
// import materialMapList from "../data/materials/combinedMaterials";
import utils from "../components/utils";

let ModelLoader = Backbone.Model.extend({
  initialize: function () {
    this.initLoadingManager();
    this.materialLibrary = new MaterialLibrary({ manager: this.manager });
    this.addListeners();
  },
  addListeners: function () {
    eventController.on(eventController.LOAD_JSON_MODEL, this.loadModel, this);
    commandController.reply(commandController.PARSE_JSON_MODEL, this.parseJSONModelGetMesh, this);
    commandController.reply(commandController.GET_TEXT_MESH, this.getTextMesh, this);
  },
  initLoadingManager: function () {
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = function ( item, loaded, total) {
      // console.log("loader on start----------------1----------")
      eventController.trigger(eventController.ITEM_START_LOAD, loaded, total);
    };
    this.manager.onProgress = function ( item, loaded, total ) {
      eventController.trigger(eventController.ITEM_LOADED, loaded, total);
    };

    this.manager.onLoad = function ( item, loaded, total ) {
      // setTimeout(function () {
      eventController.trigger(eventController.ALL_ITEMS_LOADED);
      // }, 1500);
    };

  },
  loadModel: function (url, name) {
    let self = this;
    let loader = new THREE.JSONLoader( this.manager );

    loader.load(url, function ( geometry, materials ) {
      // let bufferGeo = new THREE.BufferGeometry();
      //     bufferGeo.fromGeometry ( geometry );
      //     bufferGeo.computeBoundingBox();

      let newMaterials = self.getMeshMaterials(materials);
      materials = null;

      let mesh3d = new THREE.Mesh( geometry, newMaterials[0] );
          mesh3d.name = name;
      if (name === "russia") console.log("MESHRUSSIA:", mesh3d);
      eventController.trigger(eventController.MODEL_LOADED, mesh3d);

    });
  },
  getMeshMaterials: function (materials) {
    let matLib = this.materialLibrary;
    let newMaterials = [];

    materials.forEach( function (mat) {
      newMaterials.push(this.materialLibrary.getMaterial(mat));
    }, this);

    return newMaterials;
  },
  getModelDetailsObj: function ( object3d, options ) {
    return {
      name: options.name,
      sceneModelName: options.sceneModelName,
      object3d: object3d
    };
  },
  parseJSON: function (json) {
    let loader = new THREE.JSONLoader(this.manager);
    let model = loader.parse(json);
    model.materials = this.getMeshMaterials(model.materials);

    return model;
  },
  parseJSONModelGetMesh: function (json) {
    let model = this.parseJSON(json);
    return new THREE.Mesh(model.geometry, model.materials[0]);
  }
});

module.exports = ModelLoader;
