import BaseAnimatedModel from "./BaseAnimatedModel";
import TWEEN from "tween.js";

let SpitfireModel = BaseAnimatedModel.extend({
  defaults: {
    "name":"spitfire",
    "baseUrl": "models3d/animatedModels/",
    "modelNames":["spitfire", "spitfirePropeller"],
    "power": "ally",
    "startPosition": {x: -13.170102650922006, y: 0.23923397143583375, z: 3.67371880032149},
    "endPosition":  {x: -6.050718357879541, y: 0.20238620399077972, z: 4.5898200449053155}
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
  setInitPivot: function () {
    this.getPivot().rotation.set(0, (Math.PI / 180 * 90), 0 );
    this.getPivot().scale.set(0.1,0.1,0.1 );
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
