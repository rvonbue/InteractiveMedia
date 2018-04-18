import countryNameView from "./countryNameView";
import sliderBar from "./sliderBar";
import timelineControlPanel from "./timelineControlPanelView";
import templateHtml from "./bottomBarView.html";
import eventTitleView from "./eventTitleView";
import dateLabelView from "./dateLabelView";

let BottomBarView = Backbone.View.extend({
  className: "bottom-bar-view",
  getGridCell: function (size) {
    return $(`<div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-${size}"></div>`);
  },
  render: function () {
    let gridCell1 = this.getGridCell(2),
        gridCell2 = this.getGridCell(4),
        gridCell3 = this.getGridCell(6);

    this.$el.append(templateHtml);

    let innerGridEl = this.$el.find(".mdc-layout-grid__inner:first");
    gridCell1.append(new timelineControlPanel().render().el);
    gridCell2.append(new countryNameView().render().el);
    gridCell3.append(new dateLabelView().render().el);
    gridCell3.append(new eventTitleView().render().el);
    gridCell3.append(new sliderBar().render().el);

    innerGridEl.append(gridCell1);
    innerGridEl.append(gridCell3);
    innerGridEl.append(gridCell2);
    return this;
  }
});

module.exports = BottomBarView;
