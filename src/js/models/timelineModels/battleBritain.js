import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import spitfireModel from "../animatedModels/spitfireModel";
import messerschmittModel from "../animatedModels/messerschmittModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let BattleBritain = BaseTimelineModel.extend({
  defaults:{
    name: "britishAirRaid",
    animatedModels: [messerschmittModel], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    modelDetails: {
      arrows: [
             {
                start: {x: -12.07, y: 0.25, z: 6.68},
                end: {x: -13.47, y: 0.25, z: 4.867},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -13.62, y: 0.25, z: 7.17},
                end: {x: -14.54, y: 0.25, z: 5.03},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -15.08, y: 0.25, z: 7.70},
                end: {x: -16.09, y: 0.25, z: 5},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             }]
    },
    historyDetails: {
      countries: [
        { name:"unitedkingdom", power: 1, invaded: false},
        { name:"latvia", power: 0, invaded: true, silent: true},
        { name:"lithuania", power: 0, invaded: true, silent: true},
        { name:"estonia", power: 0, invaded: true, silent: true}
      ],
      eventPositions: {
        targetPosition: {x: -10.422032314109362, y: -2.767908515571208, z: 3.98483323035648},
        cameraPosition: {x: -11.256251587384604, y: 5.367395621760747, z: 8.780098601818695}
      },
      date:"Aug. 15, 1940",
      title: "Battle Of Britain",
      text: "The Battle of Britain was a military campaign of the Second World War, in which the Royal Air Force (RAF) defended the United Kingdom (UK) against large-scale attacks by the German Air Force (Luftwaffe). It has been described as the first major military campaign fought entirely by air forces"
    }
  },
  // startAnimation: function () {
  //   TWEEN.removeAll();
  //   let self = this;
  //   this.animateArrowModels();
  //   self.showModels();
  //   // setTimeout(function () {
  //   //   self.animatedModelsCollection.each( (model)=> model.startAnimation() );
  //   //   self.flyPlaneAcrossScreen();
  //   //   self.showModels();
  //   // }, 1000);
  //
  // },
  flyPlaneAcrossScreen: function () {

    this.animatedModelsCollection.each( (model)=> {
      let tween = this.getTween(
        model.getPivot().position,
        model.get("endPosition"),
        this.get("animationDuration")
      );
      tween.onComplete(()=> { model.hide(); })
      tween.start();
    }, this);

  },
  getTween: function (from, to, duration) {
    let tween = new TWEEN.Tween(from, {override:true} )
    .to( {x:[to.x], y:[from.y, 0.45, to.y], z: [to.z]}, duration );
     // fly up dive bomb
    this.get("tweens").push(tween);
    return tween;
  }
});

_.defaults(BattleBritain.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BattleBritain;
