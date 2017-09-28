import TWEEN from "tween.js";
import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
const OrbitControls = require('three-orbit-controls')(THREE);

let CAMERA_INTIAL_POSITION =  { x: -0.5, y: 4.5, z: 3.25 };
let TARGET_INITIAL_POSITION = { x: -0.5, y: 0, z: 1 };

let CameraControls = Backbone.Model.extend({
  defaults: {
    animating: false,
  },
  initialize: function (options) {
    this.addListeners();
    this.camera = new THREE.PerspectiveCamera( 75, options.size.w / options.size.h, 0.1, 1000 );
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
  testOffscreen: function (object) {
      return this.getMaxFrustum(object);
  },
  frustumCheck: function (object) {
    let frustum = new THREE.Frustum();
    let cameraViewProjectionMatrix = new THREE.Matrix4();

    this.camera.updateMatrixWorld(); // make sure the camera matrix is updated
    this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
    cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
    frustum.setFromMatrix( cameraViewProjectionMatrix );
    return frustum.intersectsBox( object );
  },
  getNewPos: function () {

  },
  translateBox: function (bbox, key, moveVal) {
    bbox.max[key] = bbox.max[key] += moveVal;
    bbox.min[key] = bbox.min[key] += moveVal;
  },
  getMaxFrustum: function (object) {
    var bbox = new THREE.Box3().setFromObject(object);
    let isVisible = false;
    let translateDist = -1;
    let n = 0;


    do {
      n++;
      this.translateBox(bbox, "x", translateDist);
      isVisible = this.frustumCheck(bbox);
      // console.log("bbox.max.x:::isHidden", isVisible);
    }
    while(isVisible);

    // console.log("bbox", this.frustumCheck(bbox));
    // this.frustumCheck(object);
    //
    return { x: n * translateDist, y: 0, z: 0 };
  },
  getMinFrustum: function () {

  },
  addListeners: function () {
    eventController.on(eventController.SET_CAMERA_TARGET, this.setCameraTarget, this);
    eventController.on(eventController.ON_RESIZE, this.onResize, this);
    commandController.reply(commandController.TEST_OFFSCREEN, this.testOffscreen, this);
  },
  onResize: function (size) {  // this.orbitControls.object  is the camera
    this.orbitControls.object.aspect = size.w / size.h;
    this.orbitControls.object.updateProjectionMatrix();
  },
  removeListeners: function () {
  }
});

module.exports = CameraControls;
