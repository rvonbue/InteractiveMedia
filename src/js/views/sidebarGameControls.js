import eventController from "../controllers/eventController";
import axisAllyView from "../views/axisAllyView";
import template from "./sidebarGameControls.html";

let SidebarGameControls = Backbone.View.extend({
  className: "sidebar-game-controls",
  events: {
    "click button": "startTimelineModel"
  },
  initialize: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.selectAxisAlly, this);
    eventController.on(eventController.LOAD_TIMELINE_MODEL, this.loadTimelineModel, this);
  },
  selectAxisAlly: function () {

  },
  startTimelineModel: function () {
    eventController.trigger(eventController.START_TIMELINE_MODEL);
    this.$el.find("button").fadeOut();
  },
  loadTimelineModel: function (historyDetails) {
    console.log("timelinsfsdf historyDetails", historyDetails);
    this.updateHistoryDetails(historyDetails);
  },
  updateHistoryDetails: function (historyDetails) {
    this.historyDetailsEl.empty();
    this.historyDetailsEl.append($(template(historyDetails)));
  },
  render: function () {
    this.$el.append(new axisAllyView().render().el);
    this.historyDetailsEl = $(`<div class='history-details'></div>`);
    this.$el.append(this.historyDetailsEl);
    return this;
  }
});

module.exports = SidebarGameControls;
