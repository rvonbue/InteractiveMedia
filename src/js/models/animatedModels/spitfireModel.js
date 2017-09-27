import BaseAnimatedModel from "./BaseAnimatedModel";
import TWEEN from "tween.js";

let SpitfireModel = BaseAnimatedModel.extend({
  defaults: {
    "name":"spitfire",
    "baseUrl": "models3d/animatedModels/",
    "modelNames":["spitfire", "spitfirePropeller"],
    "mesh3d": null,
    "loading": false,
    "ready": false,
  },
  addListeners: function () {
    BaseAnimatedModel.prototype.addListeners.apply(this, arguments);
    this.once("change:ready", ()=> {
      this.setRandomFlightNoise();
      // this.makeSquadron();
    });
  },
  makeSquadron: function () {
    let mesh3d = this.get("mesh3d");
    mesh3d.children.forEach( (object3d)=> {
      let cloneObj = object3d.clone();
      cloneObj.position.set(0, 0 ,cloneObj.position.z + 2.25 );
      mesh3d.add(cloneObj);
    });
  },
  setMesh3d: function (mesh3d) {
    BaseAnimatedModel.prototype.setMesh3d.apply(this, arguments);

    if ( mesh3d.name === "spitfirePropeller" ) this.setPropellerRotation(mesh3d);

    this.setIntialposition();
    if ( this.get("mesh3d").children.length === this.get("modelNames").length) {
      this.set("ready", true);
    }
  },
  setIntialposition: function () {
    // this.get("mesh3d").scale.set(0.25, 0.25, 0.25);
    this.get("mesh3d").position.set(-8, 0.25 ,0 );
    this.get("mesh3d").rotation.set(0, (Math.PI / 180 * 90), 0.05 );
  },
  setRandomFlightNoise: function () {
    this.getTween(this.get("mesh3d").rotation,  { z: -0.05 }, 1000).start();
  },
  getTween: function (from, to, duration) {
    return new TWEEN.Tween( from )
        .to( to, duration )
        .repeat( Infinity )
        .yoyo( true );
  },
  setPropellerRotation: function (mesh3d) {
    this.translatePivotPoint(mesh3d);
    this.getTween(mesh3d.rotation,  { z: 4 * Math.PI }, 500).start();
  },
  translatePivotPoint: function (mesh3d) {
    let distX = 0.00097;  // Magic Number propeller THREEjs cannot computer center correctly
    let distY = 0.08204;
    let distZ = -0.43746;
    mesh3d.geometry.translate( -distX,-distY, -distZ );
    mesh3d.position.set(distX, distY, distZ);
  }
});

module.exports = SpitfireModel;
