import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let InvasionPoland = BaseTimelineModel.extend({
  defaults:{
    name: "invasionPoland",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 3000,
    modelDetails: {
      arrows: [
             {
                start: {x: -5.559, y: 0.2, z: 4.029},
                end: {x: -3.155, y: 0.2, z: 3.477},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: -3.77, y:0.2, z: 6.24},
                end: {x: -2.21, y: 0.2, z: 4.82},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: 2.56, y: 0.2, z: 2.48},
                end: {x: 0.12, y: 0.2, z: 2.99},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT,
                animationDelay: 500
             },
             {
                start: {x: 3.1716295447066285, y: 0.11723444116216841, z: 5.37444626742571},
                end: {x: 0.34992144898361194, y: 0.17352284566233384, z: 5.104068181308493},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT,
                animationDelay: 500
             }
          ]
    },
    historyDetails: {
      countries: [
        { name:"germany", power: 0, invaded: false},
        { name:"eastprussia", power: 0, invaded: false},
        { name:"hungary", power: 0, invaded: false},
        { name:"russia", power: 0, invaded: false},
        { name: "poland", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -2.336991143750445, y: -2.153566862780448, z: 3.0383154047995986},
        cameraPosition: {x: -1.732991143750445, y: 10.376733137219553, z: 11.2313154047996}
      },
      date:"Sept. 1, 1939",
      title: "Invasion of Poland",
      text: "Germany invades Poland from the east and south. The Soviet Red Army's invasion of Eastern Poland beagan on 17 September, in accordance with a secret protocol of the Molotov–Ribbentrop Pact"
    }
  }
});

_.defaults(InvasionPoland.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = InvasionPoland;
