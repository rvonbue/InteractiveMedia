import BattleBritain from "./battleBritain";
// import RedArmyCounterOffensive from "./redArmyCounterOffensive";
import InvasionPoland from "./invasionPoland";
import InvasionDenmarkNorway from "./invasionDenmarkNorway";
import InvasionBelgiumNetherlandsFrance from "./invasionBelgiumNetherlandsFrance";

let allTimelineModels = [
  null,
  InvasionPoland,
  InvasionDenmarkNorway,
  InvasionBelgiumNetherlandsFrance,
  BattleBritain
];

module.exports = {allTimelineModels: allTimelineModels, length: allTimelineModels.length} ;
