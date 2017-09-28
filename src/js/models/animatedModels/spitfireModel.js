import BaseAnimatedModel from "./BaseAnimatedModel";
import TWEEN from "tween.js";

let SpitfireModel = BaseAnimatedModel.extend({
  defaults: {
    "name":"spitfire",
    "baseUrl": "models3d/animatedModels/",
    "modelNames":["spitfire", "spitfirePropeller"],
  },
  addListeners: function () {
    BaseAnimatedModel.prototype.addListeners.apply(this, arguments);
    this.once("change:ready", ()=> {
      this.setRandomFlightNoise();
    });
  },
  setMesh3d: function (mesh3d) {
    BaseAnimatedModel.prototype.setMesh3d.apply(this, arguments);

    if ( mesh3d.name === "spitfirePropeller" ) this.setPropellerRotation(mesh3d);

    this.setIntialposition();
  },
  setIntialposition: function () {
    // this.get("meshGroup").scale.set(0.25, 0.25, 0.25);

    let pivot = this.getPivot();
    pivot.rotation.set(0, (Math.PI / 180 * 90), 0.05 );
    this.get("meshGroup").position.y = 1;
  },
  setRandomFlightNoise: function () {
    this.getTween(this.getPivot().rotation,  { z: -0.05 }, 1000).start();
  },
  getTween: function (from, to, duration) {
    return new TWEEN.Tween( from )
        .to( to, duration )
        .repeat( Infinity )
        .yoyo( true );
  },
  setPropellerRotation: function (mesh3d) {
    this.translateCenterPoint(mesh3d);
    this.getTween(mesh3d.rotation,  { z: 4 * Math.PI }, 500).start();
  },
  translateCenterPoint: function (mesh3d) {
    let distX = 0.00097;  // Magic Number propeller THREEjs cannot computer center correctly
    let distY = 0.08204;
    let distZ = -0.43746;
    mesh3d.geometry.translate( -distX,-distY, -distZ );
    mesh3d.position.set(distX, distY, distZ);
  }
});

_.defaults(SpitfireModel.prototype.defaults, BaseAnimatedModel.prototype.defaults);

module.exports = SpitfireModel;
