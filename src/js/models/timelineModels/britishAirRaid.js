import eventController from "../../controllers/eventController";
import spitfireModel from "../animatedModels/spitfireModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let BritishAirRaid = Backbone.Model.extend({
  defaults:{
    modelUrls:[],
    animatedModels: [spitfireModel],
  },
  initialize: function () {
    this.animatedModelsCollection = new AnimatedModelCollection();
    this.addListeners();
    this.createModels();
    this.loadAnimatedModels();
  },
  addListeners: function () {
    eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
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
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [animatedModel.get("mesh3d")]);
  },
  isModelReady: function () {

  }
});

module.exports = BritishAirRaid;
