import eventController from "../../controllers/eventController";

let BaseAnimatedModel = Backbone.Model.extend({
  defaults: {
    "name": "NAME",
    "baseUrl": "models3d/animatedModels/",
    "modelNames": ["models3d/animatedModels/default", "models3d/animatedModels/default"],
    "totalLoaded": 0,
    "meshGroup": null,
    "ready": false,
    "tweens": []
  },
  initialize: function( options ) {
    let group = new THREE.Group();
    group.add(new THREE.Object3D()); // add pivot
    this.set("meshGroup", group);

    this.addListeners();
  },
  addListeners: function () {
    this.once("change:ready", ()=> { this.modelReady(); });
  },
  modelReady: function () {
    console.log("ready");
  },
  getModelUrls: function () {
    let baseUrl =  this.get("baseUrl");
    let loaderObjArr = this.get("modelNames").map( (modelName)=> {
       let parentName = modelName === this.get("name") ? null : this.get("name");
       return { name: modelName, baseUrl: baseUrl, parentName: parentName };
     });
    return loaderObjArr;
  },
  hide: function () {
    this.getPivot().visible = false;
  },
  show: function () {
    this.getPivot().visible = true;
  },
  getPivot: function () {
    return this.get("meshGroup").children[0];
  },
  setMesh3d: function (mesh3d) {
    this.set("totalLoaded", this.get("totalLoaded") + 1 );
    this.getPivot().add(mesh3d);

    if ( this.get("totalLoaded") === this.get("modelNames").length) this.set("ready", true);
  },
  setInitPosition: function (pos) {
    this.set("startPosition",pos.startPosition);
    this.set("endPosition", pos.endPosition);
    this.getPivot().position.set(pos.startPosition.x, pos.startPosition.y, pos.startPosition.z);
  }
});

module.exports = BaseAnimatedModel;
