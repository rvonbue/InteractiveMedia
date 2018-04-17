import eventController from "../../controllers/eventController";
import template from "./calenderView.html";

let CalenderView = Backbone.View.extend({
  className: "calender-view",
  events: { },
  render: function () {
    this.$el.append(template);
    return this;
  }
});

module.exports = CalenderView;
