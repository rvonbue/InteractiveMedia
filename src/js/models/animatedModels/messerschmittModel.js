import BaseAnimatedModel from "./BaseAnimatedModel";
import TWEEN from "tween.js";

let MesserschmittModel = BaseAnimatedModel.extend({
  defaults: {
    "name":"messerschmitt",
    "baseUrl": "models3d/animatedModels/",
    "modelNames":["messerschmitt", "spitfirePropeller"],
    "power": "axis"
  },
  addListeners: function () {
    BaseAnimatedModel.prototype.addListeners.apply(this, arguments);
    this.setInitPivot();
  },
  setMesh3d: function (mesh3d) {
    BaseAnimatedModel.prototype.setMesh3d.apply(this, arguments);
    if ( mesh3d.name === "spitfirePropeller" ) this.translateInitPropeller(mesh3d);
  },
  createTween: function (from, to, duration) {
    let tween = new TWEEN.Tween( from, {override:true} )
        .to( to, duration )
        .yoyo( true );

    tween.timelineName = this.get("name");
    this.get("tweens").push(tween);
    return tween;
  },
  translateInitPropeller: function (mesh3d) {
    this.translateCenterPoint(mesh3d);
  },
  startAnimation: function () {
    this.initAnimationTweens();
    this.get("tweens").forEach( (tween)=> { tween.start(); });
  },
  stopAnimation: function () {
    this.get("tweens").forEach( (tween)=> { tween.stop(); });
    this.set("tweens", []);
  },
  getPropellerMesh: function () {
    return _.find(this.getPivot().children, (mesh3d)=> { return mesh3d.name === "spitfirePropeller"; });
  },
  initAnimationTweens: function () {
    let propellerMesh3d = this.getPropellerMesh();
    this.createTween(propellerMesh3d.rotation,  { z: "+150" }, 5000);   // startPropellerRotation
    this.createTween(this.getPivot().rotation,  { z: -0.15 }, 500)    // setRandomFlightNoise
  },
  setInitPosition: function (pos) {
    this.set("initialPosition",{ x: 0, y: 1, z: 0 });  // MAGIC NUMBER
    this.set("startPosition",{ x: pos.x, y: 1, z: pos.z});
    this.set("endPosition", { x: pos.x * -1, y: 1, z: pos.z });
    this.getPivot().position.set(pos.x ,1, pos.z);
  },
  setInitPivot: function () {
    this.getPivot().rotation.set(0, Math.PI / -2, 0 );
  },
  resetPosition: function () {
    let pos = this.get("startPosition");
    this.getPivot().position.set(pos.x, pos.y, pos.z);
  },
  translateCenterPoint: function (mesh3d) {
    let distX = 0.00097;  // Magic Number propeller THREEjs cannot computer center correctly
    let distY = 0.08204;
    let distZ = -0.43746;
    mesh3d.geometry.translate( -distX,-distY, -distZ );
    mesh3d.position.set(distX, distY, distZ);
  }
});

_.defaults(MesserschmittModel.prototype.defaults, BaseAnimatedModel.prototype.defaults);

module.exports = MesserschmittModel;
