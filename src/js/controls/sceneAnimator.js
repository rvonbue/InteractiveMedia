import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";


let SceneAnimator = Backbone.Model.extend({
  animating: false,
  initialize: function (options) {
    this.addListeners();
  },
  mouseClickSelect: function (options) {
    let sceneModel = commandController.request(commandController.GET_SCENE_MODEL, options );
    sceneModel.set("selected", !sceneModel.get("selected"));
  },
  mouseHoverSelect: function (options) {
    if (!options) {
      this.unsetSceneModelHover();
      return;
    };
    eventController.trigger(eventController.UNSET_ALL_HOVER_MODELS, false);
    let sceneModel = commandController.request(commandController.GET_SCENE_MODEL, options );
    sceneModel.set("hover", true);
  },
  unsetSceneModelHover: function () {
    eventController.trigger(eventController.UNSET_ALL_HOVER_MODELS, false);
  },
  addListeners: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.mouseClickSelect, this);
    eventController.on(eventController.HOVER_NAVIGATION, this.mouseHoverSelect, this);
  },
  removeListeners: function () {
  }
});

module.exports = SceneAnimator;
