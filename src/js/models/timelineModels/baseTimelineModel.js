import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
import TWEEN from "tween.js";
import triangleJSON from "../../data/triangle.json";

let BaseTimelineModel = Backbone.Model.extend({
  defaults:{
    name: "DEFAULT",
    animationDuration: 5000,
    animatedModels: [], //this.animatedModelsCollection
    models: [],
    modelArrows: [],
    modelArrowHeads: [],
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
    this.getArrowHeadModels();
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
    this.showAllModels();
    this.animateArrowModels();
    _.delay(_.bind(this.animateInvasion, this), 1000);

    this.animationTimer = setTimeout(function () {
        eventController.trigger(eventController.TIMELINE_MODEL_ANIMATION_COMPLETE);
    }, this.get("animationDuration"));

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
  hideModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.hide(); });
    this.get("models").forEach((mesh)=> {
      mesh.visible = false;
    });
    this.hideModelArrows();
    this.hideModelArrowHeads();
  },
  hideModelArrows: function () {
    this.get("modelArrows").forEach((modelArrowsArr)=> {
      modelArrowsArr.forEach( (meshArr)=> {
        meshArr.forEach( (mesh)=> mesh.visible = false);
      });
    });
  },
  hideModelArrowHeads: function () {
    _.each(this.get("modelArrowHeads"), (mesh)=> {
       mesh.visible = false;
    });
  },
  animateInvasion: function () {
    let invadedCountries = _.where(this.get("historyDetails").countries, {invaded: true, silent: false});
    eventController.trigger(eventController.INVADE_COUNTRY, invadedCountries);
  },
  animateArrowModels: function () {

    _.each(this.get("modelArrows"), (modelArrows)=> {  // this.get("modelArrows") == [[],[],[]];
      modelArrows.forEach( (arrowMesh, index)=> {
        let arrowConstructor = this.get("modelDetails").arrows[index];

        let delayTime = arrowConstructor.animationDelay ? arrowConstructor.animationDelay : 0;
        _.delay(_.bind(this.addRemoveArrowSegment, this), delayTime, arrowMesh, index );

      })
    });
  },
  moveArrowhead: function (mesh, arrowHead) {
    let pos = mesh.curvePoints[mesh.curvePoints.length - 1];
    arrowHead.position.set(pos.x, pos.y, pos.z);
  },
  addRemoveArrowSegment: function (arrowMesh, arrowIndex) {
    let self = this;

    arrowMesh.forEach( (mesh, index)=> {
        let duration = 50;
        let arrowHead = self.get("modelArrowHeads")[arrowIndex];
        arrowHead.visible = true;

          setTimeout(function () {
            mesh.visible = true;
            self.moveArrowhead(mesh, arrowHead);

            setTimeout(function () {
              if (index !== arrowMesh.length - 1 ) mesh.visible = false; // dont hide last arrowMesh
            }, 100);

          }, (duration * index) );
      })
  },
  showAllModels: function () {
    this.animatedModelsCollection.forEach( function (model) { model.show(); });
    this.get("models").forEach((mesh)=> {
      mesh.visible = true;
    });
    // _.each(this.get("modelArrowHeads"), (mesh)=> {
    //    mesh.visible = true;
    // });
  },
  getStartPosition: function (meshGroup, power) {
    return commandController.request(commandController.TEST_OFFSCREEN, meshGroup, power);
  },
  getArrowModels: function () {
    let modelsArr = [];

    _.each(this.get("modelDetails"), (models)=> {
      modelsArr.push(commandController.request(commandController.GET_CURVE, this.get("modelDetails").arrows, []));
    });

    this.set('modelArrows', modelsArr);

    _.each(modelsArr, (arrowMeshesArr)=> {
      _.each(arrowMeshesArr, (arrowMeshArr, index)=> {
        eventController.trigger(eventController.ADD_MODEL_TO_SCENE, arrowMeshArr);
      });
    });

  },
  getArrowHeadModels: function () {
    let arrowHeadModels = [];

    _.each(this.get("modelDetails").arrows, (arrow)=> {

      let arrowHead = commandController.request(commandController.PARSE_JSON_MODEL, triangleJSON);
      let angleRadians = Math.atan2(arrow.end.x - arrow.start.x, arrow.end.z - arrow.start.z);
      angleRadians += Math.PI;
      // console.log("angleRadians:aD", (angleRadians * 57.295779513));
      arrowHead.visible = false;
      arrowHead.rotation.set(0, angleRadians ,0);
      arrowHead.position.set(arrow.start.x, arrow.start.y, arrow.start.z);

      arrowHeadModels.push(arrowHead);

      eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [arrowHead] );
    }, this);

    this.set("modelArrowHeads", arrowHeadModels);


    // var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

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
