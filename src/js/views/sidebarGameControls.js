import eventController from "../controllers/eventController";
import axisAllyView from "../views/axisAllyView";
import template from "./sidebarGameControls.html";

let SidebarGameControls = Backbone.View.extend({
  className: "sidebar-game-controls open",
  events: {
    "click button": "startTimelineModel",
    "click .toggle-hide-window": "toggleClose"
  },
  initialize: function () {
    // eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.selectAxisAlly, this);
    eventController.on(eventController.LOAD_TIMELINE_MODEL, this.loadTimelineModel, this);
  },
  selectAxisAlly: function () {

  },
  toggleClose: function () {

  },
  startTimelineModel: function () {
    eventController.trigger(eventController.START_TIMELINE_MODEL);
    this.$el.find("button").fadeOut();
  },
  loadTimelineModel: function (historyDetails) {
    this.$el.removeClass("open");

    let self = this;

    setTimeout(function () {
      if (historyDetails) self.updateHistoryDetails(historyDetails);
    },1000);

  },
  updateHistoryDetails: function (historyDetails) {
    this.$el.addClass("open");
    this.historyDetailsEl.empty().append($(template(historyDetails)));
  },
  render: function () {
    // this.$el.append(new axisAllyView().render().el);
    this.historyDetailsEl = $(`<div class='history-details'></div>`);
    this.$el.append(this.historyDetailsEl);
    return this;
  }
});

module.exports = SidebarGameControls;
