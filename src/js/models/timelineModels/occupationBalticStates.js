import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let OccupationBalticStates = BaseTimelineModel.extend({
  defaults:{
    name: "occupationBalticStates",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    modelDetails: {
      arrows: [
             {
                start: {x: -5.559, y: 0.2, z: 4.029},
                end: {x: -3.155, y: 0.2, z: 3.477},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             }
          ]
    },
    historyDetails: {
      countries: [
        { name:"italy", power: 0, invaded: true, silent: true},
        { name:"albania", power: 0, invaded: true, silent: true},
        { name:"latvia", power: 0, invaded: true, silent: false},
        { name:"lithuania", power: 0, invaded: true, silent: false},
        { name:"estonia", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -0.052508573082279394, y: -1.8097311835506389, z: 0.13874310955287258},
        cameraPosition: {x: 0.16449823501762634, y: 11.595883357676787, z: 1.8988068611237985}
      },
      date:"Jun. 14 1940",
      title: "Occupation of Baltic States",
      text: "The occupation of the Baltic states was the military occupation of the three Baltic states—Estonia, Latvia and Lithuania—by the Soviet Union under the auspices of the Molotov–Ribbentrop Pact on 14 June 1940["
    }
  }
});

_.defaults(OccupationBalticStates.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = OccupationBalticStates;
