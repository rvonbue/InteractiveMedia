import eventController from "./controllers/eventController";
import LightControls from "./controls/LightControls";
import CameraControls from "./controls/cameraControls";
import SceneLoader from "./models/SceneLoader";
import MeshSelector from "./controls/meshSelector";
import SceneAnimator from "./controls/sceneAnimator";
import Renderer from "./controls/renderer";
import TimelineManager from "./models/timelineManager";
// import StatsView from "./components/statsView";

import sidebarGameControls from "./views/sidebarGameControls";
import countryInfoView from "./views/CountryInfo";
import sliderBar from "./views/sliderBar";
import loadingBarView from "./views/loadingBarView";
import template from "./appView.html";
import { EffectComposer, GlitchPass, RenderPass } from "postprocessing";

import TWEEN from "tween.js";
window.TWEEN = TWEEN;

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
    this.addHelpers(this.scene);
    // this.composer = new EffectCompose  r( this.renderer );
		// this.composer.addPass( new RenderPass( this.scene, this.controls.camera ) );
    //
		// let	glitchPass = new GlitchPass();
		// 		glitchPass.renderToScreen = true;
		// this.composer.addPass( glitchPass );
    //
    // this.renderer.composer = this.composer;
    this.renderer.animate();

  },
  addHelpers: function (scene) {
    let helper = new THREE.GridHelper( 75 , 75 );
				helper.material.opacity = 0.25;
				helper.material.transparent = true;
				scene.add( helper );
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
    this.$el.append(template);
    this.$el.append(new sidebarGameControls().render().el);
    this.$el.append(new countryInfoView().render().el);
    this.$el.append(new sliderBar().render().el);
    this.$el.append(new loadingBarView().render().el);
    this.canvasEl = $("<canvas>");
    this.$el.append(this.canvasEl);
    return this;
  }
});

module.exports = AppView3d;
