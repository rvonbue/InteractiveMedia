import BaseAnimatedModel from "./BaseAnimatedModel";

let SpitfireModel = BaseAnimatedModel.extend({
  defaults: {
    name:"spitfire",
    baseUrl: "models3d/animatedModels/",
    "modelNames":["spitfire", "spitfirePropeller"],
    "mesh3d": null,
    "loading": false,
    "ready": false,
  },
});

module.exports = SpitfireModel;
