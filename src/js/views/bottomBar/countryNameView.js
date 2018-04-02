import eventController from "../../controllers/eventController";
import template from './countryNameView.html';

let CountryNameView = Backbone.View.extend({
  className: "country-info",
  initialize: function () {
    this.addListeners();
  },
  addListeners: function () {
    eventController.on(eventController.HOVER_NAVIGATION, this.mouseHover, this);
  },
  mouseHover: function (raycast) {
    this.$el.empty();
    if (raycast && raycast.object)  this.$el.append(template({name: raycast.object.name }));
  },
  render: function () {
    return this;
  }
});

module.exports = CountryNameView;
