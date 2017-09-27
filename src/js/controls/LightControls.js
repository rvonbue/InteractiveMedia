import TWEEN from "tween.js";

import eventController from "../controllers/eventController";
import utils from "../components/utils";
var worldColor = utils.getWorldLighting();

var LightControls = Backbone.View.extend({
  initialize: function (options) {
    this.worldLights = [];
    this.addLight();
    this.addListeners();
  },
  addListeners: function () {
  },
  removeListeners: function () {
  },
  addLight: function () {
    this.addHemisphereLight();
    // this.addDirectionalLight();
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, this.worldLights);
  },
  resetScene: function () {
    this.toggleWorldLighting(this.getResetLightSettings());
  },
  resetToSceneDetails: function (sceneModel) {
    var sceneDetails = sceneModel.get("sceneDetails");
    if ( sceneDetails ) this.toggleWorldLighting(sceneDetails.get("intialAmbientLights"));
  },
  getResetLightSettings: function () {
    return {
      hemisphere: {
        skyColor: worldColor.hemisphere.sky,
        groundColor: worldColor.hemisphere.ground,
        intensity: worldColor.hemisphere.intensity
      },
      directional: {
        color: worldColor.directional.color,
        intensity: worldColor.directional.intensity
      }
    };
  },
  updateHemisphereLight: function (options) {
    var light = _.findWhere(this.worldLights, {type: options.lightType});
    delete options.lightType;

    _.each(options, function (val, key) {
      if (key === "skyColor" || key === "groundColor" || key === "color") {
        light[key] = new THREE.Color(val);
      } else {
        light[key] = val;
      }

    });
  },
  getClickLighting: function (sky, ground) {
    return {
      hemisphere: {
        skyColor: sky,
        groundColor: ground,
        intensity: worldColor.hemisphere.intensity
      },
      directional: {
        color: sky,
        intensity: worldColor.directional.intensity
      }
    };
  },
  toggleWorldLighting: function (newLightSettings) {
    // if (!newLightSettings) return;
    if (newLightSettings) {
      _.each(this.worldLights, function (light) {
        if (light.type === "HemisphereLight"  ) this.setHemiLight(light, newLightSettings.hemisphere);
        if (light.type === "DirectionalLight")  this.setDirectionalLight(light, newLightSettings.directional);
      }, this);
    } else {
      this.resetScene();
    }
  },
  getTween: function (light, endPos , speed) {
    var tween = new TWEEN.Tween(light)
    .to({ intensity: endPos }, speed)
    return tween;
  },
  getWorldLight: function (lightType) {
    return _.findWhere(this.worldLights, {type: lightType});
  },
  addDirectionalLight: function () {
    var directionalLight = new THREE.DirectionalLight(
      worldColor.directional.color,
      worldColor.directional.intensity
    )
    var pos = worldColor.directional.position;

    directionalLight.position.set(pos.x, pos.y, pos.z);
    this.worldLights.push(directionalLight);
    // this.worldLights.push(new THREE.DirectionalLightHelper( directionalLight, 5 ));
  },
  setDirectionalLight: function (light, newLight) {
    if (!newLight) return;
    light.color = light.hex = new THREE.Color(newLight.color);
    light.intensity = newLight.intensity;
    // var tween = this.getTween(light, newLight.intensity, 1500);
    // tween.start();
  },
  setHemiLight: function (light, newLight) {
    light.skyColor =  new THREE.Color(newLight.skyColor);
    light.groundColor = new THREE.Color(newLight.groundColor);
    light.intensity = newLight.intensity;
    // var tween = this.getTween(light, newLight.intensity, utils.getAnimationSpeed().lightOut, light );
    // tween.start();
  },
  addHemisphereLight: function () {

    var hemiLight = new THREE.HemisphereLight(
      worldColor.hemisphere.sky,
      worldColor.hemisphere.ground,
      worldColor.hemisphere.intensity
    );
    this.worldLights.push(hemiLight);
  }
});

module.exports = LightControls;
