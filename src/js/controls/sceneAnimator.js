import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import utils from "../components/utils";
let colorPallete = utils.getColorPallete();

let SceneAnimator = Backbone.Model.extend({
  animating: false,
  initialize: function (options) {
    this.addListeners();

    let self = this;
  },
  hoverAxisOrAlly: function (axisOrAlly) {
    let allHoverModels = this.requestSceneModels({power: axisOrAlly });
    _.each(allHoverModels, (sceneModel) => {
      sceneModel.set("hover", true);
    });
  },
  mouseClickSelect: function (raycast) {
    let sceneModel = this.requestSceneModel({ name: raycast.object.name });
    sceneModel.set("selected", !sceneModel.get("selected"));
  },
  requestSceneModel: function (opts) {
    return commandController.request(commandController.GET_SCENE_MODEL, opts );
  },
  requestSceneModels: function (opts) {
    return commandController.request(commandController.GET_SCENE_MODELS, opts );
  },
  mouseHover: function (raycast) {
    this.unsetSceneModelHover();
    if (raycast) this.requestSceneModel({name: raycast.object.name}).set("hover", true);
  },
  unsetSceneModelHover: function () {
    eventController.trigger(eventController.UNSET_ALL_HOVER_MODELS, false);
  },
  getCatmullRomCurve: function (arrow) {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(arrow.start.x, arrow.start.y, arrow.start.z),
        // new THREE.Vector3((arrow.start.x + arrow.end.x) / 2, 1.5, (arrow.startz + arrow.end.z) / 2),
        new THREE.Vector3(arrow.end.x, arrow.end.y, arrow.end.z)
      ]
    );
  },
  getArrowHead: function () {
    // var triangleShape = new THREE.Shape();
		// 		triangleShape.moveTo( 0, -0.375);
		// 		triangleShape.lineTo( -0.375, 0.375 );
		// 		triangleShape.lineTo( 0.375, 0.375 );
		// 		triangleShape.lineTo( 0, -0.375 ); // close path
    //
    // var geometry2 = new THREE.ExtrudeGeometry( triangleShape,  { amount: 0.05, bevelEnabled: false,  steps: 2} );
    // var material2 = new THREE.MeshPhongMaterial( { color: colorPallete.ally , wireframe: false } );
    // var mesh2 = new THREE.Mesh( geometry2, material2 );
    //
    // var box = new THREE.Box3().setFromObject( mesh2 );
    // box.center( mesh.position ); // this re-sets the mesh position
    // mesh2.position.multiplyScalar( - 1 );
    //
    // let pivot = new THREE.Group();
    // // mesh2.position.set(1, 2,0);
    //
    // pivot.add(mesh2);
    // pivot.rotation.set(Math.PI / 2, 0, Math.PI / 4);
    // pivot.position.set(-14, 0.3, 4);

    // eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [ pivot] );
  },
  addCurve: function (arrow) {
    let index = 24;
    var curve = this.getCatmullRomCurve(arrow);
    var numPoints = 24;
    var points = curve.getPoints(numPoints);
    // points.length = index;

    curve = new THREE.CatmullRomCurve3( points ); //smooth intital path

    var shape = new THREE.Shape();
        shape.moveTo( 0,0 );
        shape.lineTo( 0, arrow.height );
        shape.lineTo( arrow.width, arrow.height );
        shape.lineTo( arrow.width, 0 );
        shape.lineTo( 0, 0 );

    var extrudeSettings = {
      steps: index,
      bevelEnabled: false,
      extrudePath: curve
    };

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var material = new THREE.MeshPhongMaterial( { color: colorPallete.ally , wireframe: false } );
    var mesh = new THREE.Mesh( geometry, material );

    return mesh;
    // eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [mesh] );


    // let self = this;
    // if (index < numPoints) {
    //   setTimeout(function () {
    //     self.addCurve(++index)
    //     // eventController.trigger(eventController.REMOVE_MODEL_FROM_SCENE, [mesh] );
    //   }, 25);
    // }

  },
  addListeners: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.mouseClickSelect, this);
    eventController.on(eventController.HOVER_NAVIGATION, this.mouseHover, this);
    eventController.on(eventController.HOVER_ALL_AXIS_OR_ALLY, this.hoverAxisOrAlly, this);
    commandController.reply(commandController.GET_CURVE, (arrows)=> {
      return arrows.map((arrow)=> {   return this.addCurve(arrow); });
    });
  }
});

module.exports = SceneAnimator;
