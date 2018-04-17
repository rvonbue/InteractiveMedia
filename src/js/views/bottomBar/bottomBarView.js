import countryNameView from "./countryNameView";
import sliderBar from "./sliderBar";
import timelineControlPanel from "./timelineControlPanelView";
import templateHtml from "./bottomBarView.html";

let BottomBarView = Backbone.View.extend({
  className: "bottom-bar-view",
  render: function () {

    `mdc-layout-grid__cell`;
    this.$el.append(templateHtml);
    this.innerGridEl = this.$el.find(".mdc-layout-grid__inner:first");
    this.innerGridEl.prepend(new timelineControlPanel().render().el);
    // this.$el.append(new timelineControlPanel().render().el);
    // this.$el.append(new countryNameView().render().el);
    this.innerGridEl.append(new sliderBar().render().el);
    return this;
  }
});

module.exports = BottomBarView;
