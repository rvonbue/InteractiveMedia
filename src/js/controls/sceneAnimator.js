import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import utils from "../components/utils";
// import triangleJSON from "./data/triangle.json";
let colorPallete = utils.getColorPallete();

let SceneAnimator = Backbone.Model.extend({
  animating: false,
  initialize: function (options) {
    this.addListeners();
  },
  hoverAxisOrAlly: function (axisOrAlly) {
    let allHoverModels = this.requestSceneModels({power: axisOrAlly });
    _.each(allHoverModels, (sceneModel) => { sceneModel.set("hover", true); });
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
    return commandController.request(commandController.PARSE_JSON_MODEL, triangleJSON);
  },
  getCurveAnimate: function (arrow) {
    let curves = [];
    for (let x = 2; x <= 24; x++) {
      curves.push(this.getNewCurve(arrow, x));
    }
    return curves;
  },
  getNewCurve: function (arrow, index) {
    index = index ? index : 24;
    var curve = this.getCatmullRomCurve(arrow);
    var numPoints = 24;
    var points = curve.getPoints(24);
    points.length = index;
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
    var material = new THREE.MeshPhongMaterial( { color: colorPallete.axis , wireframe: false } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.animationDelay = arrow.animationDelay ? arrow.animationDelay : 0;
    mesh.visible = false;
    mesh.curvePoints = points;
    return mesh;
  },
  addListeners: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.mouseClickSelect, this);
    eventController.on(eventController.HOVER_NAVIGATION, this.mouseHover, this);
    eventController.on(eventController.HOVER_ALL_AXIS_OR_ALLY, this.hoverAxisOrAlly, this);
    commandController.reply(commandController.GET_CURVE, (arrows)=> {
      return arrows.map((arrow)=> {   return this.getCurveAnimate(arrow); });
    });
  }
});

module.exports = SceneAnimator;
