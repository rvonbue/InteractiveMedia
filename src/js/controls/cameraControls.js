import TWEEN from "tween.js";
// import THREE from "three";
import eventController from "../controllers/eventController";
// import commandController from "../controllers/commandController";
const OrbitControls = require('three-orbit-controls')(THREE);

let CAMERA_INTIAL_POSITION =  { x: -0.5, y: 5, z: 4.0 };
let TARGET_INITIAL_POSITION = { x: -0.5, y: 0, z: 1 };

let CameraControls = Backbone.Model.extend({
  defaults: {
    animating: false,
  },
  initialize: function (options) {
    this.addListeners();
    this.orbitControls = new OrbitControls(options.camera, options.canvasEl);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.1;
    this.orbitControls.rotateSpeed = 0.15;
    window.orbitControls = this.orbitControls;
    this.resetCameraPositionTarget();
  },
  getControls: function () {
    return this.orbitControls;
  },
  resetCameraPositionTarget: function () {
    this.setCameraPosition(CAMERA_INTIAL_POSITION);  // set Initial Camera Position
    this.setCameraTarget(TARGET_INITIAL_POSITION);
  },
  setCameraPosition: function (pos) {
    this.orbitControls.object.position.set( pos.x, pos.y, pos.z );  // this.orbitControls.object  is the camera
  },
  setCameraTarget: function (pos) {
    this.getTween(this.orbitControls.target, new THREE.Vector3( pos.x, pos.y, pos.z )).start();
  },
  getTween: function (to, from) {
    return new TWEEN.Tween(to)
      .easing(TWEEN.Easing.Circular.Out)
      .interpolation(TWEEN.Interpolation.Bezier)
      .to(from, 500);
  },
  addListeners: function () {
    eventController.on(eventController.SET_CAMERA_TARGET, this.setCameraTarget, this);
  },
  removeListeners: function () {
  }
});

module.exports = CameraControls;
