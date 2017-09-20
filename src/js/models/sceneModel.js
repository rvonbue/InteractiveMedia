// import eventController from "../controllers/eventController";
import utils from "../components/utils";
import TWEEN from "tween.js";

var SceneModel = Backbone.Model.extend({
  defaults: {
    "name": "Caesar_Salad",
    "className": "myClass",
    "mesh3d": null,
    "text3d": null,  // mesh
    "selected": false,
    "hover": false,
    "loading": false, //loading scene Details currently
    "ready": false,  //ready if sceneDetails are loaded
    "interactive": true,
    "sceneDetails": null, // sceneDetailsModel
  },
  initialize: function( options ) {
    this.addModelListeners();
  },
  addModelListeners: function () {
    this.on("change:selected", this.onChangeSelected);
    this.on("change:hover", this.onChangeHover);
  },
  removeModelListeners: function () {
    this.off("change:selected", this.onChangeSelected);
    this.off("change:hover", this.onChangeHover);
  },
  onChangeSelected: function () {
    let yPos = this.get("selected") ? -0.1 : 0.1;
    this.animateSelected(yPos);
  },
  animateSelected: function (yPosMod) {
    let mesh3d = this.get("mesh3d");
    let yPos = mesh3d.position.y;
    console.log("mesh3d", mesh3d);

    var tween = new TWEEN.Tween(mesh3d.position)
      .easing(TWEEN.Easing.Circular.Out)
      .interpolation(TWEEN.Interpolation.Bezier)
      .to({ y: yPos + yPosMod }, 500)
      .onComplete(function () {})
      .start();
  },
  onChangeHover: function () {
    if ( this.get("selected") ) return;
  },
  reset: function (showHideBool) {
    this.set("selected", false);
    this.set("hover", false);
  },
  isReady: function () {
    return this.get("ready") && !this.get("loading");
  },
  showHide: function (visBool, hideText) { // show = true

  },
  getSize: function (mesh) {
    mesh = mesh ? mesh : this.get("mesh3d");
    var height = Math.abs(mesh.geometry.boundingBox.max.y) + Math.abs(mesh.geometry.boundingBox.min.y);
    var width = Math.abs(mesh.geometry.boundingBox.max.x) + Math.abs(mesh.geometry.boundingBox.min.x);
    var length = Math.abs(mesh.geometry.boundingBox.max.z) + Math.abs(mesh.geometry.boundingBox.min.z);
    return { w: width, h: height, l: length };
  },
  toggleTextMaterial: function (mat) {
    var textColor = this.get("hover") ? utils.getColorPallete().text.color2 : utils.getColorPallete().text.color;
    mat.emissive = new THREE.Color(textColor);
  },
  setFadeInMaterial:function (mat) {
      mat.opacity = 0;
      mat.transparent = true;
  },
  setFadeOutMaterial: function (mat) {
      mat.transparent = true;
      mat.opacity = 1;
  },
  fadeMaterials: function (opacityEnd, materials) {
    var allMaterials = materials ? materials : this.getAllMaterials();

    allMaterials.forEach(function (mat) {
      this.fadeMaterial(mat, opacityEnd, utils.getAnimationSpeed().materialsFade);
    }, this);

  },
  fadeMaterial: function (mat, opacityEnd, tweenSpeed) {
    var newOpacityEnd = mat.opacityMax ? mat.opacityMax : opacityEnd;
    newOpacityEnd === 0 ? this.setFadeOutMaterial(mat) : this.setFadeInMaterial(mat);

    var tween = new TWEEN.Tween(mat)
        .easing(TWEEN.Easing.Circular.Out)
        .interpolation(TWEEN.Interpolation.Bezier)
        .to({ opacity: newOpacityEnd }, tweenSpeed)
        .onComplete(function () {
          if ( opacityEnd === 1  && !mat.alwaysTransparent ) {
            mat.transparent = false;
          } else if (opacityEnd === 0) {
            // self.set({ selected: false });
          }
        })
        .start();
  },
});

module.exports = SceneModel;
