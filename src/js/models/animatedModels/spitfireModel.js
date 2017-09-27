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
  setMesh3d: function (mesh3d) {
    BaseAnimatedModel.prototype.setMesh3d.apply(this, arguments);
    if (mesh3d.name === "spitfirePropeller") this.setPropellerRotation(mesh3d);
    // this.get("mesh3d").scale.set(0.25, 0.25, 0.25);
    this.get("mesh3d").position.set(-2, 0.25 ,0 );
    this.get("mesh3d").rotation.set(0, (Math.PI / 180 * 90), 0 );
  },
  setPropellerRotation: function (mesh3d) {
    let distX = 0.00097;  // Magic Number propeller THREEjs cannot computer center correctly
    let distY = 0.08204;
    let distZ = -0.43746;
    mesh3d.geometry.translate( -distX,-distY, -distZ );
    mesh3d.position.set(distX, distY, distZ);

    var tween = new TWEEN.Tween( mesh3d.rotation )
        .to( { z: 4 * Math.PI }, 500 )
        .onComplete( function () {
          mesh3d.rotation.z = 0;
          tween.start();
        })
        .start();

  }
});

module.exports = SpitfireModel;
