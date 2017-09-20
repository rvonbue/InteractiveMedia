require("expose-loader?$!jquery");

import stylesheet from "./styles/index.less";
import THREE from "three";

import _ from "underscore";
window._ = _;

import Backbone from "backbone";
Backbone.$ = $;
window.Backbone = Backbone;
import Radio from "backbone.radio";
Backbone.Radio = Radio;
import eventController from "./js/controllers/eventController";
import commandController from "./js/controllers/commandController";
import AppView from "./js/appView";

let view = "";

function isCanvasSupported () {
  var elem = document.createElement("canvas");
  return !!(elem.getContext && elem.getContext("2d"));
}

function startApp () {
  view = new AppView({});
}

$(function () {
  if (isCanvasSupported()) {
    startApp();
  } else {
    $("body").append(NoCanvasSupportTemplate);
    return;
  }

  $("body").append(view.render().el);
  view.initScene();

  window.eventController = eventController;
  window.commandController = commandController;

});
