'use strict';

import eventController from "./controllers/eventController";
import LightControls from "./controls/LightControls";
import CameraControls from "./controls/cameraControls";
import SceneLoader from "./components/SceneLoader";
import MeshSelector from "./controls/meshSelector";
import SceneAnimator from "./controls/sceneAnimator";
import Renderer from "./controls/renderer";
import StatsView from "./components/statsView";
import { EffectComposer, FilmPass, RenderPass } from "postprocessing";
import InfoPaneHover from "./views/infoPaneHover";


let AppView3d = Backbone.View.extend({
  className: "appView",
  initialize: function (options) {
    _.bindAll(this, "resize");
  },
  addListeners: function () {
    $(window).on("resize", this.resize);
  },
  initScene: function () {
    this.addListeners();
    let size = this.getWidthHeight();
    this.scene = new THREE.Scene();

    this.renderer = new Renderer({
      size: size,
      canvas: this.canvasEl[0],
      scene: this.scene,
     });

    this.controls = new CameraControls({ camera:this.camera, canvasEl: this.canvasEl[0], size: size })
    new SceneLoader({ scene: this.scene });
    new LightControls();
    new MeshSelector({ canvasEl: this.canvasEl, camera: this.controls.orbitControls.object });
    new SceneAnimator();
    // this.addPostProcessing();

    this.renderer.controls = this.controls
    this.renderer.animate();

    setTimeout(()=> {
      this.resize(); },
    10);
  },
  addPostProcessing: function () {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    const pass = new FilmPass(0.8, 0.325, 256, false);
    this.composer.renderToScreen = true;
    this.composer.addPass(pass);
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
    this.$el.append(new InfoPaneHover().render().el);

    this.statsView = new StatsView();
    this.$el.append(this.statsView.render().el);

    this.canvasEl = $("<canvas>");
    this.$el.append(this.canvasEl);

    return this;
  }
});

module.exports = AppView3d;
