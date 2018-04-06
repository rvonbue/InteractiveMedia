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
                start: {x: -12.079899196937872, y: 0.25, z: 6.685945261901754},
                end: {x: -13.474889869860409, y: 0.25, z: 4.867826417428992},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -13.624606909527785, y: 0.25, z: 7.175814468072406},
                end: {x: -14.54527651465046, y: 0.25, z: 5.031264243463197},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -15.08120304460886, y: 0.25, z: 7.7024957198835775},
                end: {x: -16.09498897531568, y: 0.25, z: 5.007030931977936},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             }]
    },
    historyDetails: {
      countries: [
        { name:"germany", power: 0, invaded: false},
        { name:"unitedkingdom", power: 1, invaded: false},
        { name: "poland", power: 0, invaded: true, silent: true},
        { name: "norway", power: 0, invaded: true, silent: true},
        { name: "denmark", power: 0, invaded: true, silent: true},
        { name:"belgium", power: 0, invaded: true, silent: true},
        { name:"netherlands", power: 0, invaded: true, silent: true},
        { name: "france", power: 0, invaded: true, silent: true}
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
  startAnimation: function () {
    TWEEN.removeAll();
    let self = this;
    this.animateArrowModels();
    self.showModels();
    // setTimeout(function () {
    //   self.animatedModelsCollection.each( (model)=> model.startAnimation() );
    //   self.flyPlaneAcrossScreen();
    //   self.showModels();
    // }, 1000);

  },
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
