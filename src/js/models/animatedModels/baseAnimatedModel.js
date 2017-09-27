import eventController from "../../controllers/eventController";

let BaseAnimatedModel = Backbone.Model.extend({
  defaults: {
    "name": "NAME",
    "baseUrl": "models3d/animatedModels/",
    "modelNames": ["models3d/animatedModels/default", "models3d/animatedModels/default"],
    "totalLoaded": 0,
    "mesh3d": null,
    "ready": false,
  },
  initialize: function( options ) {
    this.addModelListeners();
    this.set("mesh3d", new THREE.Group());
    console.log("init:BaseAnimatedModel", this);
  },
  getModelUrls: function () {
    let baseUrl =  this.get("baseUrl");
    let loaderObjArr = this.get("modelNames").map( (modelName)=> {
       let parentName = modelName === this.get("name") ? null : this.get("name");
       return { name: modelName, baseUrl: baseUrl, parentName: parentName };
     });
    return loaderObjArr;
  },
  setMesh3d: function (mesh3d) {
    this.set("totalLoaded", this.get("totalLoaded") + 1 );
    this.get("mesh3d").add(mesh3d);

    if ( this.get("totalLoaded") === this.get("modelNames").length) {
      this.set("ready", true);
    }
  },
  addModelListeners: function () {
    // this.once("change:mesh3d", ()=> {
    //     self.set("initPos", _.clone(self.get("mesh3d").position));
    // });
  }
});

module.exports = BaseAnimatedModel;
