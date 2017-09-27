import BaseAnimatedModel from "../models/animatedModels/BaseAnimatedModel";

var AnimatedModelCollection = Backbone.Collection.extend({
  model: BaseAnimatedModel
});

module.exports = AnimatedModelCollection;
