import eventController from "../../controllers/eventController";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
import TWEEN from "tween.js";

let BaseTimelineModel = Backbone.Model.extend({
  defaults:{
    name: "DEFAULT",
    animatedModels: [], //this.animatedModelsCollection
    tweens: [],
    ready: false
  },
  initialize: function () {
    this.animatedModelsCollection = new AnimatedModelCollection();
    this.addListeners();
    this.createModels();
    this.loadAnimatedModels();
    this.allModelsReady();
  },
  addListeners: function () {
    eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.once(eventController.ALL_ITEMS_LOADED, this.isModelReady, this );
  },
  animateCamera: function () {
    eventController.trigger(eventController.ANIMATE_CAMERA, this.get("historyDetails").eventPositions);
  },
  hideModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.hide(); });
  },
  showModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.show(); });
  },
  getStartPosition: function (meshGroup, power) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup, power);
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
  getModelNames: function () {
    return this.animatedModelsCollection.map( (model)=> {
      return model.get("name");
    });
  },
  createModels: function () {
    _.each(this.get("animatedModels"), (model)=> {
      this.animatedModelsCollection.add(new model());
    });
  },
  modelLoaded: function (mesh3d) {
    let name = mesh3d.parentName !== null ? mesh3d.parentName : mesh3d.name;
    let animatedModels = this.animatedModelsCollection.where({ name: name });

    animatedModels.forEach((animatedModel)=> {
      animatedModel.setMesh3d(mesh3d);
      eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [animatedModel.get("meshGroup")]);
    });
  },
  allModelsReady: function () {
    let allModelsReady = true;
    this.animatedModelsCollection.each( (model)=> {
      if(!model.get("ready")) allModelsReady = false;
    })
    return allModelsReady;
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
  isModelReady: function () {
    if ( this.allModelsReady) {
      this.set("ready", true);
      eventController.off(eventController.MODEL_LOADED, this.modelLoaded, this );
    }
  },
  isReady: function () {

  }
});

module.exports = BaseTimelineModel;
