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
import Extras from "./components/extras";
// import StatsView from "./components/statsView";
import AudioControls from "./controls/AudioControls";
import bottomBarView from "./views/bottomBar/bottomBarView";
import loadingBarView from "./views/loadingBarView";
import { EffectComposer, GlitchPass, FilmPass, RenderPass } from "postprocessing";


let AppView3d = Backbone.View.extend({
  className: "appView",
  initialize: function (options) {
    _.bindAll(this, "resize");
    let audioControls = new AudioControls();
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
    new Extras();

		// let composer = new EffectComposer( this.renderer.renderer );
		// composer.addPass( new RenderPass( this.scene, this.controls.orbitControls.object ) );
		// let glitchPass = new FilmPass(
    //   {
    //     noise: true,
    //     noiseIntensity: 0.05,
    //     scanlineIntensity: 0.05,
    //     scanlines: false,
    //     greyscale: false,
    //     sepia: false,
    //     grid: false,
    //   }
    // );
		// glitchPass.renderToScreen = true;
		// composer.addPass( glitchPass );
    // this.renderer.composer = composer;

    this.renderer.animate();

  },
  getWidthHeight: function () {
    return {w: this.$el.width(), h: this.$el.height() - 150 };
  },
  resize: function () {
    let size = this.getWidthHeight();

    this.canvasEl.attr({ width: size.w, height: size.h });
    eventController.trigger(eventController.ON_RESIZE, size);
  },
  render: function () {
    this.$el.append(new bottomBarView().render().el);
    this.$el.append(new loadingBarView().render().el);
    this.canvasEl = $("<canvas>");
    this.$el.append(this.canvasEl);
    return this;
  }
});

module.exports = AppView3d;
