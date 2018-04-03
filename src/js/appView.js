import eventController from "./controllers/eventController";
import TWEEN from "tween.js";
window.TWEEN = TWEEN;

import LightControls from "./controls/LightControls";
import CameraControls from "./controls/cameraControls";
import SceneLoader from "./models/SceneLoader";
import MeshSelector from "./controls/meshSelector";
import SceneAnimator from "./controls/sceneAnimator";
import Renderer from "./controls/renderer";
import TimelineManager from "./models/timelineManager";
// import StatsView from "./components/statsView";

import sidebarGameControls from "./views/sidebarGameControls";
import bottomBarView from "./views/bottomBar/bottomBarView";
import loadingBarView from "./views/loadingBarView";

let AppView3d = Backbone.View.extend({
  className: "appView",
  initialize: function (options) {
    _.bindAll(this, "resize");
  },
  addListeners: function () {
    $(window).on("resize", this.resize);
    eventController.once(eventController.ALL_ITEMS_LOADED,()=> {
      this.resize();
    }, this);
  },
  initScene: function () {
    this.addListeners();
    let size = this.getWidthHeight();
    this.scene = new THREE.Scene();

    this.controls = new CameraControls({
      canvasEl: this.canvasEl[0],
      size: size
    });

    this.renderer = new Renderer({
      size: size,
      canvas: this.canvasEl[0],
      scene: this.scene,
      controls: this.controls
     });

    new SceneLoader({
       scene: this.scene
    });

    new MeshSelector({
      canvasEl: this.canvasEl,
      camera: this.controls.orbitControls.object
    });

    new SceneAnimator();
    new LightControls();
    new TimelineManager();
    // this.addGround(this.scene);
    // this.addHelpers(this.scene);
    this.addCurve(this.scene);
    this.renderer.animate();

  },
  addHelpers: function (scene) {
    let helper = new THREE.GridHelper( 100   , 100 );
				helper.material.opacity = 0.5;
				helper.material.transparent = false;
      	helper.material.color.b = 0;
        helper.material.color.g = 0;
		scene.add( helper );
  },
  addGround: function (scene) {
    var geometry = new THREE.PlaneGeometry( 75, 75, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
        plane.rotation.set(Math.PI /2, 0, 0);
    console.log("plane", plane);
    scene.add( plane );

  },
  addCurve: function (scene) {
    var curve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-2, 2, 0),
        new THREE.Vector3(-1, 0.5, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(1, 3, 0),
        new THREE.Vector3(2, 1, 0)
      ]
    );

    var pointsCount = 50;
    var pointsCount1 = pointsCount + 1;
    var points = curve.getPoints(pointsCount);
    
    var pts = curve.getPoints(pointsCount);
    var width = 2;
    var widthSteps = 1;
    let pts2 = curve.getPoints(pointsCount);
    pts2.forEach(p => {
      p.z += width;
    });
    pts = pts.concat(pts2);
    console.log("BufferGeometry", new THREE.BufferGeometry())
    var ribbonGeom = new THREE.BufferGeometry().setFromPoints(pts);

    var indices = [];
    for (iy = 0; iy < widthSteps; iy++) { // the idea taken from PlaneBufferGeometry
      for (ix = 0; ix < pointsCount; ix++) {
        var a = ix + pointsCount1 * iy;
        var b = ix + pointsCount1 * (iy + 1);
        var c = (ix + 1) + pointsCount1 * (iy + 1);
        var d = (ix + 1) + pointsCount1 * iy;
        // faces
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
    ribbonGeom.setIndex(indices);
    ribbonGeom.computeVertexNormals();

    var ribbon = new THREE.Mesh(ribbonGeom, new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide
    }));
    scene.add(ribbon);

    var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({
      color: "red",
      depthTest: false
    }));
    scene.add(line);
  },
  getWidthHeight: function () {
    return {w: this.$el.width(), h: this.$el.height() };
  },
  resize: function () {
    let size = this.getWidthHeight();

    this.canvasEl.attr({ width: size.w, height: size.h });
    eventController.trigger(eventController.ON_RESIZE, size);
  },
  render: function () {
    this.$el.append(new bottomBarView().render().el);
    this.$el.append(new sidebarGameControls().render().el);
    this.$el.append(new loadingBarView().render().el);
    this.canvasEl = $("<canvas>");
    this.$el.append(this.canvasEl);
    return this;
  }
});

module.exports = AppView3d;
