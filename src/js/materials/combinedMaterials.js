import materialMap_countries from "./materialMap_countries";
import materialMap_weapons from "./materialMap_weapons";

var materialMapList = _.extendOwn(
  materialMap_countries,
  materialMap_weapons
);

module.exports = materialMapList;
