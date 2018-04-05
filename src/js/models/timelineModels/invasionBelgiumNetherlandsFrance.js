import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let invasionBelgiumNetherlandsFrance = BaseTimelineModel.extend({
  defaults:{
    name: "invasionBelgiumNetherlandsFrance",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    historyDetails: {
      countries: [
        { name:"germany", power: 0, invaded: false},
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
    }
  },
  flyPlaneAcrossScreen: function () {

    this.animatedModelsCollection.each( (model)=> { }, this);

  }
});

_.defaults(invasionBelgiumNetherlandsFrance.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = invasionBelgiumNetherlandsFrance;
