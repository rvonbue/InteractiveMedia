import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController"
import utils from "./utils";
let colorPallete = utils.getColorPallete();
import flagPole from "../data/flagPole.json";
import { Color } from "three";

let SceneModel = Backbone.Model.extend({
  defaults: {
    "name": "Caesar_Salad",
    "sceneDetails": []
  },
  initialize: function( options ) {
    eventController.on(eventController.UPDATE_SCENE_DETAIL, this.updateSceneDetails, this);
    // this.addGround(this.scene);
    // this.addArrowHelper(this.scene);
    this.addHelpers(this.scene);
    this.addFlagPole();
  },
  addHelpers: function () {
    let helper = new THREE.GridHelper( 100, 50 ,new Color("#ffff00"), new Color("#ffff00"));
        helper.material.opacity = 0.15;
        helper.material.transparent = true;
        helper.material.lineWidth = 5;
    helper.position.set(0, 0.25, 0);
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [ helper ] );
  },
  updateSceneDetails: function (details) {
    console.log("updateSceneDetails");
    let model = this.getModel(details.name);

    if (details.position) {
      let { x , y, z } = details.position;
      model.position.set( x , y + 5, z );
    }
    if (details.func) this[details.func](model);
    if (details.visible) model.visible = details.visible;
  },
  raiseFlag: function (model) {
      console.log("raiseFlag", model);
      model.children[1].position.set(0.75, 1, 0); //flag mesh Object3D

      this.getTweenEasing(model.position, {y:0.25}, 1500).start();      //animate drop Flag stand
      this.getTween(model.children[1].position, {x: 0.75, y:3.2,z: 0}, 1500).delay(1500).start();  //raiseFlag
  },
  getTween: function (from, to, duration) {
    return new TWEEN.Tween(from)
        // .easing(TWEEN.Easing.Circular.Out)
        // .interpolation(TWEEN.Interpolation.Bezier)
        .to(to, duration);
  },
  getTweenEasing: function (from, to, duration) {
    return new TWEEN.Tween(from)
        .easing(TWEEN.Easing.Bounce.Out)
        .to(to, duration);
  },
  getModel: function (name) {
    return _.findWhere(this.get("sceneDetails"),{name: name});
  },
  addGround: function () {
    var geometry = new THREE.PlaneGeometry( 100, 100, 4 );
    var material = new THREE.MeshBasicMaterial( {color: "#4682B4", side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
        plane.rotation.set(Math.PI /2, 0, 0);
        // plane.position.set(0, 0.1, 0);
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [ plane ] );
  },
  addArrowHelper: function () {
    var dir = new THREE.Vector3( 1, 2, 0 );

    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();

    var origin = new THREE.Vector3( 0, 0, 0 );
    var length = 1;
    var hex = 0xffff00;

    var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [arrowHelper] );
  },
  addFlagPole: function () {
    let flagPoleModel = commandController.request(commandController.PARSE_JSON_MODEL, flagPole);
    let pivot = new THREE.Object3D();
        pivot.name = "flagPole"
        pivot.add(flagPoleModel);

    let geometry = new THREE.PlaneGeometry( 1.5, 0.75, 4 );
    let material = new THREE.MeshLambertMaterial( {color: "#ff0000", side: THREE.DoubleSide} );
    let plane = new THREE.Mesh( geometry, material );
        plane.position.set(0.75, 1, 0);
        plane.rotation.set(0, 0, 0);
        plane.name = "flag";
        pivot.add(plane);
        pivot.visible = false;
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [ pivot ] );
    this.set("sceneDetails", [...this.get("sceneDetails"), pivot]);
    console.log("this.get(sceneDetails)", this.get("sceneDetails"));
  }
});

module.exports = SceneModel;
