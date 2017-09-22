import eventController from "../controllers/eventController";
import TWEEN from "tween.js";
import raf from "raf";
import StatsView from "../components/statsView";
import { EffectComposer, FilmPass, RenderPass } from "postprocessing";

let Renderer = Backbone.Model.extend({
  defaults: {},
  initialize: function( options ) {
    _.bindAll(this, "animate");
    eventController.on(eventController.ON_RESIZE, this.onResize, this);
    this.initRenderer(options.size, options.canvas);
    this.clock = new THREE.Clock();
    this.scene = options.scene;
    this.controls = options.controls;
  },
  initRenderer: function (size, canvas) {
    this.renderer = new THREE.WebGLRenderer({ alpha:true, antiAlias:true, canvas: canvas });
    this.renderer.setSize( size.w, size.h );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    // this.renderer.setClearColor( "#778899", 0 );
  },
  animate: function (time) {
    this.renderLoop = raf( this.animate );
    // this.statsView.stats.begin();
    TWEEN.update(time);
    this.controls.orbitControls.update(this.clock.getDelta());

    // this.composer.render(this.clock.getDelta());
    this.renderer.render(this.scene, this.controls.orbitControls.object);
    // this.statsView.stats.end();
  },
  cancelAnimate: function () {
    raf.cancel(this.renderLoop);
    this.renderLoop = null;
  },
  // addPostProcessing: function () {
  //   this.composer = new EffectComposer(this.renderer);
  //   this.composer.addPass(new RenderPass(this.scene, this.camera));
  //
  //   const pass = new FilmPass(0.8, 0.325, 256, false);
  //   this.composer.renderToScreen = true;
  //   this.composer.addPass(pass);
  // },
  onResize: function (size) {
    console.log("rendere::onResize:", size);
    this.renderer.setSize( size.w, size.h );
  }
});

module.exports = Renderer;
