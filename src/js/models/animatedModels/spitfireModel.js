import BaseAnimatedModel from "./BaseAnimatedModel";
import TWEEN from "tween.js";

let SpitfireModel = BaseAnimatedModel.extend({
  defaults: {
    "name":"spitfire",
    "baseUrl": "models3d/animatedModels/",
    "modelNames":["spitfire", "spitfirePropeller"],
    "power": "ally",
    "startPosition": {x: -30, y: 0.8, z: 1},
    "endPosition":  {x: -2.05, y: 0.8, z: 2}
  },
  setMesh3d: function (mesh3d) {
    BaseAnimatedModel.prototype.setMesh3d.apply(this, arguments);
    if ( mesh3d.name === "spitfirePropeller" ) this.translateInitPropeller(mesh3d);
  },
  setInitPivot: function () {
    this.getPivot().rotation.set(0, (Math.PI / 180 * 90), 0 );
    this.getPivot().scale.set(3, 3, 3 );
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
