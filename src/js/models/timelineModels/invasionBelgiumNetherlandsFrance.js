import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let invasionBelgiumNetherlandsFrance = BaseTimelineModel.extend({
  defaults:{
    name: "invasionBelgiumNetherlandsFrance",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    historyDetails: {
      countries: [
        { name: "poland", power: 0, invaded: true, silent: true},
        { name: "norway", power: 0, invaded: true, silent: true},
        { name: "denmark", power: 0, invaded: true, silent: true},
        { name:"belgium", power: 0, invaded: true, silent: false},
        { name:"netherlands", power: 0, invaded: true, silent: false},
        { name: "france", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -9.493636621329921, y: -3.1703219797763666, z: 5.764996518844365},
        cameraPosition: {x: -8.213446037442132, y: 9.54110862597878, z: 12.041183658558928}
      },
      date:"Apr. 9, 1940",
      title: "Invasion of Belgium, Netherlands, and France",
      text: "Germany invaded Belgium and the Netherlands to secure air fields and to flank the Maginot line setup on the border of France and Germany"
    },
    modelDetails: {
      arrows: [
         {
            start:{x: -7.873061159766172, y: 0.25, z: 6.391261894254859},
            end: {x: -10.459097979438026, y: 0.25, z: 5.6},
            width: ARROW_WIDTH,
            height:  ARROW_HEIGHT,
            animationDelay: 0
         },
         {
            start: {x: -7.243990898531779, y: 0.25, z: 4.384172006092154},
            end: {x: -10.202542852342148, y: 0.25, z: 4.5},
            width: ARROW_WIDTH,
            height:  ARROW_HEIGHT,
            animationDelay: 0
         },
         {
            start: {x: -11.209057075850255, y: 0.25, z: 5.443336150315224},
            end: {x: -13.163164987556579, y: 0.25, z: 8.218990775746947},
            width: ARROW_WIDTH,
            height:  ARROW_HEIGHT,
            animationDelay: 1000
         },
         {
            start: {x: -10.148842741468709, y: 0.25, z: 6.030380239811639},
            end: {x: -11.71001336129001, y: 0.25, z: 9.007227921312413},
            width: ARROW_WIDTH,
            height:  ARROW_HEIGHT,
            animationDelay: 1000
         }]
      }
  },
  flyPlaneAcrossScreen: function () {

    this.animatedModelsCollection.each( (model)=> { }, this);

  }
});

_.defaults(invasionBelgiumNetherlandsFrance.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = invasionBelgiumNetherlandsFrance;
