import startTimelineModel from "./startTimelineModel";
// import RedArmyCounterOffensive from "./redArmyCounterOffensive";
import InvasionPoland from "./invasionPoland";
import InvasionDenmarkNorway from "./invasionDenmarkNorway";
import InvasionBelgiumNetherlandsFrance from "./invasionBelgiumNetherlandsFrance";
import ItalyAlbaniaJoinsAxis from "./italyAlbaniaJoinsAxis";
import OccupationBalticStates from "./occupationBalticStates"
import BattleBritain from "./battleBritain";
import RomaniaJoinsAxis from "./romaniaJoinsAxis";
import BulgariaJoinsAxis from "./bulgariaJoinsAxis";
import InvasionYugoslavia from "./invasionYugoslavia";
// import InvasionRussia from "./invasionRussia";
import endTimelineModel from "./endTimelineModel";

let allTimelineModels = [
  startTimelineModel,
  InvasionPoland,
  InvasionDenmarkNorway,
  InvasionBelgiumNetherlandsFrance,
  ItalyAlbaniaJoinsAxis,
  OccupationBalticStates,
  BattleBritain,
  RomaniaJoinsAxis,
  BulgariaJoinsAxis,
  InvasionYugoslavia,
  endTimelineModel
];

module.exports = {allTimelineModels: allTimelineModels, length: allTimelineModels.length} ;
