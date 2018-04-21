import countries from "./materialMap_countries";
import weapons from "./materialMap_weapons";
import britishAirRaid from "./materialMap_britishAirRaid";

var materialMapList = _.extendOwn(
  countries,
  weapons,
  britishAirRaid
);

module.exports = materialMapList;
