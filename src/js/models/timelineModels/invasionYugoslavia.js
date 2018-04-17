import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";
const ARROW_WIDTH = 0.05;
const ARROW_HEIGHT = 0.20;

let InvasionYugoslaviaGreece = BaseTimelineModel.extend({
  defaults:{
    name: "InvasionYugoslaviaGreece",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 2500,
    modelDetails: {
      arrows: [
             {
                start: {x: -1.1944444515583743, y: 0.2065161175275631, z: 9.846371319463914},
                end: {x: -0.33815123497636684, y: 0.20197999775409697, z: 12.11854446606598},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: 3.827232890280381, y: 0.19356348341452162, z: 13.0951693492249},
                end: {x: 1.0720453024351015, y: 0.20197999775409697, z: 13.0124319997473},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT
             },
             {
                start: {x: 1.7970735704031504, y: 0.20197999775409697, z: 14.507764841451191},
                end: {x: 2.534111146888387, y: 0.19717240847954337, z: 16.256450388793088},
                width: ARROW_WIDTH,
                height:  ARROW_HEIGHT,
                animationDelay: 1250
             }
          ]
    },
    historyDetails: {
      countries: [
        { name:"yugoslovia", power: 0, invaded: true, silent: false},
        { name:"greece", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -1.54, y: -6.77, z: 12.56},
        cameraPosition: {x: -0.34, y: 8.216, z: 17.51}
      },
      date:"Apr. 6, 1941",
      title: "Invasion of Yugoslavia & Greece",
      text: "The Germans invaded Greece and Yugoslavia on 6 April 1941, and overran both countries within a month"
    }
  }
});

_.defaults(InvasionYugoslaviaGreece.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = InvasionYugoslaviaGreece;
