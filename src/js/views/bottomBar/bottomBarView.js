import countryNameView from "./countryNameView";
import sliderBar from "./sliderBar";
import dateLabelView from "./dateLabelView";

let BottomBarView = Backbone.View.extend({
  className: "bottom-bar-view",
  render: function () {
    this.$el.append(new dateLabelView().render().el);
    this.$el.append(new countryNameView().render().el);
    this.$el.append(new sliderBar().render().el);
    return this;
  }
});

module.exports = BottomBarView;
