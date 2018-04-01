import eventController from "../controllers/eventController";
import countryInfoView from "../views/CountryInfo";
import sliderBar from "../views/sliderBar";
import template from "../appView.html";

let BottomBarView = Backbone.View.extend({
  className: "bottom-bar-view",
  render: function () {
    this.$el.append(template);
    this.$el.append(new countryInfoView().render().el);
    this.$el.append(new sliderBar().render().el);
    return this;
  }
});

module.exports = BottomBarView;
