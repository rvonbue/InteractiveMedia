import eventController from "../../controllers/eventController";
import dateLabelTemplate from './dateLabel.html';
const START_DATE = "AUG. 28, 1939";

let DateLabelView = Backbone.View.extend({
  className: "map-date-info",
  initialize: function () {
    eventController.on(eventController.LOAD_TIMELINE_MODEL, this.updateLabel, this);
  },
  updateLabel: function (historyDetails) {
    let date = historyDetails ? historyDetails.date : START_DATE;
    this.$el.empty().append( dateLabelTemplate({date: date}));
  },
  render: function () {
    this.$el.append( dateLabelTemplate({date: "AUG. 28, 1939"}) );
    return this;
  }
});

module.exports = DateLabelView;
