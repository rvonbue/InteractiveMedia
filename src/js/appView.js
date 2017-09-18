import THREE from "three";
import TWEEN from "tween.js";
import raf from "raf";

import eventController from "./controllers/eventController";
import LightControls from "./controls/LightControls";
import CameraControls from "./controls/cameraControls";
import SceneLoader from "./components/SceneLoader";
import StatsView from "./components/statsView";

let AppView3d = Backbone.View.extend({
  className: "appView",
  initialize: function (options) {
    _.bindAll(this, "animate", "addModelsToScene", "resize");
    this.parentEl = options.parentEl;
    this.clock = new THREE.Clock();
  },
  addListeners: function () {
    eventController.on(eventController.ADD_MODEL_TO_SCENE, this.addModelsToScene);
    eventController.on(eventController.REMOVE_MODEL_FROM_SCENE, this.removeModelsFromScene);
    $(window).on("resize", this.resize);
  },
  removeListeners: function () {
    eventController.off(eventController.ADD_MODEL_TO_SCENE, this.addModelsToScene);
    eventController.off(eventController.REMOVE_MODEL_FROM_SCENE, this.removeModelsFromScene);
    $(window).off("resize", this.resize);
  },
  cancelAnimate: function () {
    raf.cancel(this.renderLoop);
    this.renderLoop = null;
  },
  initScene: function () {
    this.addListeners();
    let size = this.getWidthHeight();
    this.scene = window.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha:true, antiAlias:false, canvas: this.canvasEl[0] });
    this.renderer.setSize( size.w, size.h );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor( 0x000000, 0 );
    this.initCamera(size);
    this.initControls();
    this.addHelpers();
    this.initSceneLoader();
    this.lightControls = new LightControls();

    this.loadAllAssests();
    this.animate();

    setTimeout(()=> {
      this.resize(); },
    5);
  },
  initCamera: function (size) {
    this.camera = new THREE.PerspectiveCamera( 75, size.w / size.h, 0.1, 1000 );
    this.camera.lookAt(new THREE.Vector3( 1, 0, 0 ));
  },
  initControls: function () {
    this.controls = new CameraControls({ camera:this.camera, canvasEl: this.canvasEl[0] })
  },
  initSceneLoader: function () {
    let sceneLoader = new SceneLoader();
  },
  addChildViews: function (childViews) {
    this.childViews = this.childViews.concat(childViews);
  },
  addHelpers: function () {
    let axisHelper = new THREE.AxisHelper( 50 );
    axisHelper.position.y = 40;
    this.scene.add( axisHelper );
  },
  loadAllAssests: function () {
    console.log("loadAllAssests");
    const RADIUS = 5;
    const SEGMENTS = 16;
    const RINGS = 16;

    let sphere = new THREE.Mesh(new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS), new THREE.MeshLambertMaterial( { color: "#0000FF" }));

    this.scene.add(sphere);
  },
  addModelsToScene: function (sceneModelArray) {
    let scene = this.scene;
    _.each(sceneModelArray, function (object3d) {
      scene.add(object3d);
    }, this);
  },
  removeModelsFromScene: function (modelArray) {
    _.each(modelArray, function (object3d) {
      this.scene.add(object3d);
    }, this);
  },
  addHelpers: function () {
    let axisHelper = new THREE.AxisHelper( 50 );
    axisHelper.position.y = 0;
    this.scene.add( axisHelper );
    let size = 10;
    let step = 1;

    let gridHelper = new THREE.GridHelper( size, step );
    gridHelper.position.y = 0;
    this.scene.add( gridHelper );

  },
  animate: function (time) {
    this.renderLoop = raf( this.animate );
    // this.statsView.stats.begin();
    TWEEN.update(time);
    this.controls.orbitControls.update(this.clock.getDelta());
		this.renderer.render(this.scene, this.camera);
    // this.statsView.stats.end();
  },
  getWidthHeight: function () {
    return {w: this.$el.width(), h: this.$el.height() };
  },
  resize: function () {
    let size = this.getWidthHeight();
    this.camera.aspect = size.w / size.h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( size.w, size.h );
    this.canvasEl.attr({
      width: size.w,
      height: size.h
    });
    console.log("SIZE:", size);
    eventController.trigger(eventController.ON_RESIZE, size);
  },
  render: function () {

    this.canvasEl = $("<canvas>");
    this.$el.append(this.canvasEl);
    // this.renderDev();

    return this;
  }
});

module.exports = AppView3d;
