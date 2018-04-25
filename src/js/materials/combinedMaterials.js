import countries from "./materialMap_countries";
import britishAirRaid from "./materialMap_britishAirRaid";

var materialMapList = _.extendOwn(
  countries,
  britishAirRaid
);

module.exports = materialMapList;
