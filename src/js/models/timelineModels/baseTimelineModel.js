import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
import TWEEN from "tween.js";

let BaseTimelineModel = Backbone.Model.extend({
  defaults:{
    name: "DEFAULT",
    animatedModels: [], //this.animatedModelsCollection
    models: [],
    modelArrows: [],
    modelDetails: [],
    tweens: [],
    ready: false
  },
  initialize: function () {
    this.animatedModelsCollection = new AnimatedModelCollection();
    this.addListeners();
    this.createModels();
    this.loadAnimatedModels();
    this.getArrowModels();
    this.hideModels();
    this.allModelsReady();
  },
  addListeners: function () {
    eventController.on(eventController.MODEL_LOADED, this.modelLoaded, this );
    eventController.once(eventController.ALL_ITEMS_LOADED, this.isModelReady, this );
  },
  animateCamera: function () {
    eventController.trigger(eventController.ANIMATE_CAMERA, this.get("historyDetails").eventPositions);
  },
  startAnimation: function () {
    TWEEN.removeAll();
    this.resetModel();
    this.showModels();
    this.animateInvasion();
    this.animateArrowModels();
  
  },
  hideModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.hide(); });
    this.get("models").forEach((mesh)=> {
      mesh.visible = false;
    });
    this.hideModelArrows();
  },
  hideModelArrows: function () {
    this.get("modelArrows").forEach((modelArrowsArr)=> {
      modelArrowsArr.forEach( (meshArr)=> {
        meshArr.forEach( (mesh)=> mesh.visible = false);
      });
    });
  },
  animateInvasion: function () {
    let invadedCountries = _.where(this.get("historyDetails").countries, {invaded: true, silent: false});
    eventController.trigger(eventController.INVADE_COUNTRY, invadedCountries);
  },
  animateArrowModels: function () {

    _.each(this.get("modelArrows"), (modelArrows)=> {  // this.get("modelArrows") == [[],[],[]];
      modelArrows.forEach( (arrowMesh, index)=> {
        arrowMesh.forEach( (mesh, index)=> {
            let duration = 50;
              setTimeout(function () {

                mesh.visible = true;

                setTimeout(function () {
                  if (index !== arrowMesh.length - 1 ) mesh.visible = false; // dont hide last arrowMesh
                }, 50);
              }, (duration * index) );
          })
      })
    });
  },
  showModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.show(); });
    this.get("models").forEach((mesh)=> {
      mesh.visible = true;
    });
  },
  getStartPosition: function (meshGroup, power) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup, power);
  },
  getArrowModels: function () {
    let modelsArr = [];

    _.each(this.get("modelDetails"), (models)=> {
      modelsArr.push(commandController.request(commandController.GET_CURVE, models, []));
    });
    this.set('modelArrows', modelsArr);
    _.each(modelsArr, (arrowMeshesArr)=> {
      _.each(arrowMeshesArr, (arrowMeshArr, index)=> {
        eventController.trigger(eventController.ADD_MODEL_TO_SCENE, arrowMeshArr);
      });
    });

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
  resetModel: function () {
    this.stopAnimation();
    this.hideModels();
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
  getTween: function (from, to, duration) {
    let tween = new TWEEN.Tween(from, {override:true} )
    .to( {x:[to.x], y:[from.y, 0.45, to.y], z: [to.z]}, duration );
     // fly up dive bomb
    return tween;
  },
  isReady: function () {

  }
});

module.exports = BaseTimelineModel;
