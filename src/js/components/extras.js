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

    let model = this.getModel(details.name);
    console.log("updateSceneDetails", model.children[1].material);


    if (details.position) {
      let canvas = document.createElement( 'canvas' );
          canvas.width = 128;
          canvas.height = 128;

      this.drawImageSprite({
        spriteSheet: "sprite_icons",
        spriteName: "germany", //details.country.name,
        "canvas": canvas,
        "context": canvas.getContext( '2d' )
      });

      let texture = new THREE.CanvasTexture(canvas);
      model.children[1].material.map = texture;


      this.updateFlagMaterialMap(details);
      let { x , y, z } = details.position;
      model.position.set( x , y + 5, z );
    }
    if (details.func) this[details.func](model);
    if (details.visible) model.visible = details.visible;
  },
  getImageSprite: function (imgSprite) {
    return commandController.request(commandController.GET_IMAGE_SPRITE, imgSprite, this);
  },
  drawImageSprite: function (sprObj) {
    let canvas = sprObj.canvas; //? sprObj.canvas : this.getTextureCanvas();
    let context = sprObj.context;// ? sprObj.context : canvas.getContext( '2d' );

    let sprite = this.getImageSprite(sprObj);

    let spritePos = {x: sprite.size.w / 2, y: sprite.size.h / 2 };
    let canvasCenter = {x: canvas.width / 2, y: canvas.height / 2 };

    context.fillStyle = "#dc0000";
    context.fillRect(0,0,128,128)
    context.fillStyle = "#000000";
    context.lineWidth = 8;
    context.strokeRect(0,0,128,128);
    context.drawImage(sprite.imageObj,
       sprite.pos.x,  //source start
       sprite.pos.y,
       sprite.size.w, //source size
       sprite.size.h,
       24,         // draw image location on existing canvas
       24,
       sprite.size.w / 1.5,
       sprite.size.h / 1.5
    );

  },
  raiseFlag: function (model) {
      model.children[1].position.set(0.75, 1, 0); //flag mesh Object3D

      this.getTweenEasing(model.position, {y:0.25}, 1500).start();      //animate drop Flag stand
      this.getTween(model.children[1].position, {x: 0.75, y:3,z: 0}, 1500).delay(1500).start();  //raiseFlag
  },
  updateFlagMaterialMap: function (details) {
      console.log("raiseFlag", details);
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

    let geometry = new THREE.PlaneGeometry( 1.5, 1, 4 );
    let material = new THREE.MeshLambertMaterial( { side: THREE.DoubleSide } );
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
