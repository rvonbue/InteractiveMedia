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
    this.setInitPivot();
    this.resetPosition();
    this.hide();
  },
  modelReady: function () {
    console.log("defaults ready");
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
  initAnimationTweens: function () {
    let propellerMesh3d = this.getPropellerMesh();

    propellerMesh3d.forEach( (mesh3d)=> {
      this.createTween(mesh3d.rotation,  { z: "+300" }, 10000);
    }, this);

    this.getNoiseTween(this.getPivot().rotation,  { z: 0.25}, 1500)    // setRandomFlightNoise
  },
  startAnimation: function () {
    this.resetPosition();
    this.initAnimationTweens();
    this.get("tweens").forEach( (tween)=> { tween.start(); });
  },
  stopAnimation: function () {
    this.get("tweens").forEach( (tween)=> { tween.stop(); });
    this.set("tweens", []);
  },
  getNoiseTween: function (from, to, duration) {
    let tween = new TWEEN.Tween( from)
        .to(  { z: -0.25}, duration )
        .repeat( Infinity )
				// .delay( 1000 )
				.yoyo( true );

    // let tween2 = new TWEEN.Tween( from)
    //     .to(  { z: 0.25}, duration );
    //
    // tween.chain(tween2);
    this.get("tweens").push(tween);
    return tween;
  },
  createTween: function (from, to, duration) {
    let tween = new TWEEN.Tween( from, {override:true} )
        .to( to, duration )
        .yoyo( true );

    tween.timelineName = this.get("name");
    this.get("tweens").push(tween);
    return tween;
  },
  setMesh3d: function (mesh3d) {
    this.set("totalLoaded", this.get("totalLoaded") + 1 );
    this.getPivot().add(mesh3d);

    if ( this.get("totalLoaded") === this.get("modelNames").length) this.set("ready", true);
  },
  getPropellerMesh: function () {
    return _.filter(this.getPivot().children, (mesh3d)=> { return mesh3d.name === "spitfirePropeller"; });
  },
  resetPosition: function () {
    let pos = this.get("startPosition");
    this.getPivot().position.set(pos.x, pos.y, pos.z);
  },
  translateInitPropeller: function (mesh3d) {
    this.translateCenterPoint(mesh3d);
  }
});

module.exports = BaseAnimatedModel;
