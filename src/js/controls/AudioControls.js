import eventController from "../controllers/eventController";
import utils from "../components/utils";
var worldColor = utils.getWorldLighting();

var AudioControls = Backbone.Model.extend({
  defaults: {
    axis: {url:"/sounds/march.mp3", ready: false, audio: null  },
    allies: {url:"/sounds/march.mp3", ready: false, audio: null  },
    sounds: []
  },
  initialize: function (options) {
    this.addListeners();

    this.on("change:axis", ()=> {
      console.log("change:axisSoundtrack");
    });
    this.selected = "axis";
    this.loadSoundtrack(this.selected);
  },
  loadSoundtrack: function (name) {
    let axis = this.get(name);
    this.set(name, this.newAudioElement(axis));
  },
  newAudioElement: function (audioObject) {
    let audio = document.createElement('audio');

    audio.addEventListener('canplay', function() {
     audioObject.ready = true;
    }, false);
    audioObject.audio = audio;

    audio.setAttribute('src', audioObject.url);
    return audioObject;
  },
  playAudioSoundtrack: function (config) {
    let audioObj = this.get(this.selected);
    if (audioObj.ready) {
      config.play ? audioObj.audio.play() : audioObj.audio.pause();
    } else {
      console.log("audio not ready");
    }
  },
  addListeners: function () {
    eventController.on(eventController.PLAY_AUDIO_SOUNDTRACK, this.playAudioSoundtrack, this);
  },
  removeListeners: function () {

  }

});

module.exports = AudioControls;
