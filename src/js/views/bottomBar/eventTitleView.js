import eventController from "../../controllers/eventController";
// import axisAllyView from "../views/axisAllyView";
import template from "./eventTitleView.html";

let EventTitleView = Backbone.View.extend({
  className: "event-title",
  events: {
    "click button.start": "startTimelineModel",
    "click button.next": "nextTimelineModel"
  },
  initialize: function () {
    eventController.on(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, this.selectAxisAlly, this);
    eventController.on(eventController.LOAD_TIMELINE_MODEL, this.loadTimelineModel, this);
  },
  startTimelineModel: function () {
    eventController.trigger(eventController.START_TIMELINE_MODEL);
    // this.$el.find("button").fadeOut();
  },
  nextTimelineModel: function () {
    eventController.trigger(eventController.NEXT_TIMELINE_MODEL);
  },
  loadTimelineModel: function (historyDetails) {
    this.$el.removeClass("open");
    if (historyDetails) this.updateHistoryDetails(historyDetails);
    // let self = this;

    // setTimeout(function () {
    //   if (historyDetails) self.updateHistoryDetails(historyDetails);
    // },1000);

  },
  updateHistoryDetails: function (historyDetails) {
    this.$el.addClass("open");
    this.$el.empty().append($(template(historyDetails)));
  },
  render: function () {
    // this.$el.append(new axisAllyView().render().el);
    return this;
  }
});

module.exports = EventTitleView;
