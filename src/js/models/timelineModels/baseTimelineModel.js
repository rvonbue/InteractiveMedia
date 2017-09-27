import eventController from "../../controllers/eventController";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let BaseTimelineModel = Backbone.Model.extend({
  defaults:{
    name: "DEFAULT",
    modelUrls:[],
    animatedModels: [],
  },
  initialize: function () {
    this.animatedModelsCollection = new AnimatedModelCollection();
    this.addListeners();
    this.createModels();
    this.loadAnimatedModels();
  },
  addListeners: function () {
    eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.once(eventController.ALL_ITEMS_LOADED, this.allItemsLoaded, this);
  },
  allItemsLoaded: function () {
    this.animatedModelsCollection.each( (model)=> {
      model.setVisibility(true);
    });
  },
  loadAnimatedModels: function () {
    let modelUrls = [];

    this.animatedModelsCollection.models.forEach( (model)=> {
      modelUrls = [...modelUrls, ...model.getModelUrls()];
    });

    this.set("modelUrls", modelUrls.length);
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

module.exports = BaseTimelineModel;
