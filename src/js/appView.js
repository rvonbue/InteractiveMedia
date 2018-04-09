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
import { EffectComposer, GlitchPass, FilmPass, RenderPass } from "postprocessing";
import dateLabelView from "./views/bottomBar/dateLabelView";

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

		// let composer = new EffectComposer( this.renderer.renderer );
		// composer.addPass( new RenderPass( this.scene, this.controls.orbitControls.object ) );
		// let glitchPass = new FilmPass(
    //   {
    //     noise: true,
    //     noiseIntensity:0.50,
    //     scanlines: false,
    //     scanlineIntensity:0.5,
    //     greyscale: false,
    //     sepia: false
    //   }
    // );
		// glitchPass.renderToScreen = true;
		// composer.addPass( glitchPass );
    // this.renderer.composer = composer;
    this.addGround(this.scene);
    this.addArrowHelper(this.scene);
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
    var geometry = new THREE.PlaneGeometry( 100, 100, 32 );
    var material = new THREE.MeshBasicMaterial( {color: "#151515", side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
        plane.rotation.set(Math.PI /2, 0, 0);
        plane.position.set(0, 0.1, 0);
    scene.add( plane );

  },
  addArrowHelper: function (scene) {
    var dir = new THREE.Vector3( 1, 2, 0 );

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 1;
    var hex = 0xffff00;

    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    scene.add( arrowHelper );
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
    this.$el.append(new dateLabelView().render().el);
    this.$el.append(new bottomBarView().render().el);
    this.$el.append(new sidebarGameControls().render().el);
    this.$el.append(new loadingBarView().render().el);
    this.canvasEl = $("<canvas>");
    this.$el.append(this.canvasEl);
    return this;
  }
});

module.exports = AppView3d;
