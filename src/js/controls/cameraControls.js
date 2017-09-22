import TWEEN from "tween.js";
// import THREE from "three";
import eventController from "../controllers/eventController";
// import commandController from "../controllers/commandController";
const OrbitControls = require('three-orbit-controls')(THREE);

let CAMERA_INTIAL_POSITION =  { x: -0.5, y: 4.5, z: 3.25 };
let TARGET_INITIAL_POSITION = { x: -0.5, y: 0, z: 1 };

let CameraControls = Backbone.Model.extend({
  defaults: {
    animating: false,
  },
  initialize: function (options) {
    this.addListeners();
    let size = options.size;
    this.camera = new THREE.PerspectiveCamera( 75, size.w / size.h, 0.1, 1000 );
    this.orbitControls = new OrbitControls(this.camera, options.canvasEl);
    this.applySettings();
    this.resetCameraPositionTarget();
  },
  applySettings: function () {
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.1;
    this.orbitControls.rotateSpeed = 0.15;
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
    eventController.on(eventController.ON_RESIZE, this.onResize, this);
  },
  onResize: function (size) {  // this.orbitControls.object  is the camera
    this.orbitControls.object.aspect = size.w / size.h;
    this.orbitControls.object.updateProjectionMatrix();
  },
  removeListeners: function () {
  }
});

module.exports = CameraControls;
