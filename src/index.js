import Radio from "backbone.radio";
window.Backbone.Radio = Radio;

import stylesheet from "./styles/index.less";
import AppView from "./js/appView";

$(function () {
  let view = "";
  if (isCanvasSupported()) {
     view = startApp();
  } else {
    $("body").append(NoCanvasSupportTemplate);
    return;
  }

  $("body").append(view.render().el);
  view.initScene();

});

function isCanvasSupported () { //test if webgl is supported
  let elem = document.createElement("canvas");
  return !!(elem.getContext && elem.getContext("2d"));
}

function startApp () {
  return new AppView({});
}
