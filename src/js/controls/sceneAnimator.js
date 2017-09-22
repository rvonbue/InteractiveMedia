import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";

let SceneAnimator = Backbone.Model.extend({
  animating: false,
  initialize: function (options) {
    this.addListeners();
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
    // if (sceneModel.get("selected")) {
    //   eventController.trigger(eventController.SET_CAMERA_TARGET, sceneModel.getZoomPoint());
    // }
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
  addListeners: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.mouseClickSelect, this);
    eventController.on(eventController.HOVER_NAVIGATION, this.mouseHover, this);
    eventController.on(eventController.HOVER_ALL_AXIS_OR_ALLY, this.hoverAxisOrAlly, this);
  }
});

module.exports = SceneAnimator;
