import eventController from "../../controllers/eventController";
import commandController from "../../controllers/commandController";
import BaseTimelineModel from "./BaseTimelineModel";
import AnimatedModelCollection from "../../collections/animatedModelCollection";

let InvasionPoland = BaseTimelineModel.extend({
  defaults:{
    name: "invasionPoland",
    animatedModels: [], //this.animatedModelsCollection = new AnimatedModelCollection();
    animationDuration: 5000,
    historyDetails: {
      countries: [
        { name:"germany", power: 0, invaded: false},
        { name:"eastprussia", power: 0, invaded: false},
        { name:"russia", power: 0, invaded: false},
        {name: "poland", power: 0, invaded: true, silent: false}
      ],
      eventPositions: {
        targetPosition: {x: -2.336991143750445, y: -2.153566862780448, z: 3.0383154047995986},
        cameraPosition: {x: -1.732991143750445, y: 10.376733137219553, z: 11.2313154047996}
      },
      date:"Sept. 1, 1939",
      title: "Invasion of Poland",
      text: "Germany invaded Poland and officially started World War II."
    }
  },
  flyPlaneAcrossScreen: function () {

    this.animatedModelsCollection.each( (model)=> { }, this);

  },
  getTween: function (from, to, duration) {
    let tween = new TWEEN.Tween(from, {override:true} )
    .to( {x:[to.x], y:[from.y, 0.45, to.y], z: [to.z]}, duration );
     // fly up dive bomb
    return tween;
  }
});

_.defaults(InvasionPoland.prototype.defaults, BaseTimelineModel.prototype.defaults);
module.exports = InvasionPoland;
