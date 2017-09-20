import TWEEN from "tween.js";
// import THREE from "three";
import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
var OrbitControls = require('three-orbit-controls')(THREE);

let CAMERA_INTIAL_POSITION = { x: -1, y: 3, z: 5 };
let TARGET_INITIAL_POSITION = { x: -1, y: 0, z: 1 };

let CameraControls = Backbone.Model.extend({
  animating: false,
  initialize: function (options) {
    this.addListeners();
    this.orbitControls = new OrbitControls(options.camera, options.canvasEl);
    this.setCameraInitialPosition(options.camera);
  },
  getControls: function () {
    return this.orbitControls;
  },
  setCameraInitialPosition: function (camera) {
    camera.position.set( CAMERA_INTIAL_POSITION.x, CAMERA_INTIAL_POSITION.y, CAMERA_INTIAL_POSITION.z);  // set Initial Camera Position
    this.orbitControls.target = new THREE.Vector3( TARGET_INITIAL_POSITION.x, TARGET_INITIAL_POSITION.y, TARGET_INITIAL_POSITION.z );
  },
  addListeners: function () {
  },
  removeListeners: function () {
  }
});

module.exports = CameraControls;
