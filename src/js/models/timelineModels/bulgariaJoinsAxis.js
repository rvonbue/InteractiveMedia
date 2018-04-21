import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let BulgariaJoinsAxis = BaseTimelineModel.extend({
  defaults:{
    name: "bulgariaJoinsAxis",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    modelDetails: {
      flagpole: { "position": {x: 4.19562006826561, y: 0.14166200955899155, z: 13.078605091479453}},
      arrows: []
    },
    historyDetails: {
      countries: [
        { name:"bulgaria", power: 0, invaded: true, silent: false, invasionSpeed: 5000}
      ],
      eventPositions: {
        targetPosition: {x: 1.351056136588252, y: -4.7795605584761125, z: 8.11454068858119},
        cameraPosition: {x: 3.556235953785195, y: 5.478943484953555, z: 18.328718338285242}
      },
      date:"Mar. 1, 1941",
      title: "Bulgaria joins Axis",
      text: "Under pressure from Germany Bulgaria signed the Tripartite pact to permit German forces to pass through Bulgaria to attack Greece in order to help Italy."
    }
  }
});

_.defaults(BulgariaJoinsAxis.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = BulgariaJoinsAxis;
