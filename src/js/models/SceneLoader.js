import TWEEN from "tween.js";
import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import SceneModelCollection from "../collections/SceneModelCollection";
import ModelLoader from "../models/ModelLoader";
import model3dList from "../data/model3dList";

import sprite_flags from "../data/sprites/sprite_flags.json";
import sprite_otherMaps from "../data/sprites/sprite_otherMaps.json";
import sprite_countryBorders from "../data/sprites/sprite_countryBorders.json";
import sprite_icons from "../data/sprites/sprite_icons.json";

var SceneLoader = Backbone.Model.extend({
  defaults: {
    spriteSheets: [{
      name: "sprite_countryBorders",
      url: "textures/spriteSheets/sprite_countryBorders.png",
      data: sprite_countryBorders.frames
    },
    {
      name: "sprite_flags",
      url: "textures/spriteSheets/sprite_flags.png",
      data: sprite_flags.frames
    },
    {
      name: "sprite_otherMaps",
      url: "textures/spriteSheets/sprite_otherMaps.png",
      data: sprite_otherMaps.frames
    },
    {
      name: "sprite_icons",
      url: "textures/spriteSheets/sprite_icons.png",
      data: sprite_icons.frames
    }]
  },
  initialize: function (options) {
    this.sceneModelCollection = new SceneModelCollection();
    this.modelLoader = new ModelLoader();
    this.scene = options.scene;
    this.addListeners();

    _.each(model3dList, function (modelsArrObj) {
      eventController.trigger(eventController.LOAD_JSON_MODEL, modelsArrObj); //load scene Models
    }, this);

    this.loadSpriteSheets();
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
    mesh3d.scale.set(5,5,5); // scale country models 5 times
    this.addModelsToScene([ mesh3d ]);
  },
  addModelSceneCollection: function (mesh3d, modelsArrObj) {
    let sceneModel = this.sceneModelCollection.add(modelsArrObj);
    sceneModel.set("mesh3d", mesh3d);
  },
  allSceneModelsLoaded: function () {
    eventController.trigger(eventController.RESET_RAYCASTER, this.getAllMesh3d());
    eventController.off(eventController.MODEL_LOADED, this.modelLoaded, this );
    this.sceneModelCollection.each( (model)=> {
      model.set("ready", true);
    })
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
  getCountry: function (name) {
    return this.sceneModelCollection.findWhere({ name: name});
  },
  getCountries: function (countryArr) {
    let countries = [];

    countryArr.forEach( (countryObj)=> {
      countries.push(this.sceneModelCollection.findWhere({ name: countryObj.name}))
    });
    return countries;
  },
  selectSceneModels: function (countryNames) {
    if (countryNames.length === 0 ) {
      this.sceneModelCollection.each( (model)=> {
        model.unhighlightMaterial();
      });
    }

    countryNames.forEach( (countryObj)=> {

      let countryModel = this.sceneModelCollection.findWhere({ name: countryObj.name});
      countryModel.set("invaded", countryObj.invaded);
      // console.log("scountryObja", countryObj);
      if (!countryObj.invaded || (countryObj.invaded && countryObj.silent) ) {
        // console.log("countryModel", countryModel);
        countryModel.set("selected", true);
      }

    });

  },
  getInvadedCountries: function (countryNames) {

    this.getCountries(countryNames).forEach( (sceneModel, index)=> {
      sceneModel.animateInvasion(countryNames[index].invasionSpeed);
    });
  },
  addModelsToScene: function (sceneModelArray) {
    _.each(sceneModelArray, function (object3d) { this.scene.add(object3d); }, this);
  },
  removeModelsFromScene: function (modelArray) {
    _.each(modelArray, function (object3d) {
      this.scene.remove(object3d);
    }, this);
  },
  loadSpriteSheets: function () {
    this.get("spriteSheets").forEach( (spriteSheet)=> {
      eventController.trigger(eventController.LOAD_SPRITE_SHEET, spriteSheet);
    });
  },
  updateSceneModels: function (currentDate) {
      // console.log("currentDate", currentDate);
    let date =  new Date(currentDate);

    this.sceneModelCollection.each( (model)=> {
      let dates = model.get("dates");

      if (dates.invasionStart) {

        if ( date > new Date(dates.invasionStart) ) {
          model.set("invaded", true);
        } else {
          model.set("invaded", false);
        }

      } else if (dates.joinedAxis && dates.joinedAllies) {

        if ( date < new Date(dates.joinedAllies)  ) {
          model.set("power", 0);
        } else {
          model.set("power", 1);
        }
      } else if (dates.joinedAxis ) {

        if ( date > new Date(dates.joinedAxis) ) {
          model.set("power", 0);
          model.highlightMaterial();
        } else {
          model.set("invaded", false);
          model.unhighlightMaterial();
        }
      } else if (dates.joinedAllies) {
        if ( date > new Date(dates.joinedAllies) ) {
          model.set("power", 1);
          model.highlightMaterial();
        }
      }

    });
  },
  compareDate: function () {

  },
  addListeners: function () {
     eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
     eventController.on(eventController.UNSET_ALL_HOVER_MODELS, this.sceneModelHoverSet, this );
     eventController.on(eventController.ADD_MODEL_TO_SCENE, this.addModelsToScene, this);
     eventController.on(eventController.REMOVE_MODEL_FROM_SCENE, this.removeModelsFromScene, this);
     eventController.on(eventController.INVADE_COUNTRY, this.getInvadedCountries, this);
     eventController.on(eventController.UPDATE_SCENE_MODELS, this.updateSceneModels, this);

     eventController.on(eventController.SELECT_SCENE_MODELS, this.selectSceneModels, this);
     eventController.once(eventController.ALL_ITEMS_LOADED, this.allSceneModelsLoaded, this );

     commandController.reply(commandController.GET_SCENE_MODEL, this.getSceneModel, this );
     commandController.reply(commandController.GET_SCENE_MODELS, this.getSceneModels, this );
  }
});

module.exports = SceneLoader;
