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
  addListeners: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.mouseClickSelect, this);
  },
  removeListeners: function () {
  }
});

module.exports = SceneAnimator;
