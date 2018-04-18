import BaseAnimatedModel from "./BaseAnimatedModel";
import eventController from "../../controllers/eventController";
import TWEEN from "tween.js";

let MesserschmittModel = BaseAnimatedModel.extend({
  defaults: {
    "name":"messerschmitt",
    "baseUrl": "models3d/animatedModels/",
    "modelNames":["messerschmitt", "spitfirePropeller"],
    "power": "axis",
    "startPosition": {x:5, y: 0.55, z: 8},
    "endPosition": {x: -15, y: 0.55, z: 2}
  },
  modelReady: function () {
    // this.makeSquadron();
  },
  makeSquadron: function () {
    // this.getPivot().children.forEach( (mesh)=> {
    //   let clone = mesh.clone();
    //   eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [clone]);
    //   clone.position.x += 1.5;
    //   clone.position.z -= 1.5;
    //   this.getPivot().add(clone);
    //
    //   clone = mesh.clone();
    //   eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [clone]);
    //   clone.position.x -= 1.35;
    //   clone.position.z -= 1.5;
    //
    //   this.getPivot().add(clone);
    // });
  },
  setMesh3d: function (mesh3d) {
    BaseAnimatedModel.prototype.setMesh3d.apply(this, arguments);
    if ( mesh3d.name === "spitfirePropeller" ) this.translateInitPropeller(mesh3d);
  },
  setInitPivot: function () {
    this.getPivot().rotation.set(0, Math.PI / -2, 0 );
    this.getPivot().scale.set(3,3,3 );
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
