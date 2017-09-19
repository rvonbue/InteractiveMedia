// import utils from "../../util/utils";
// var colorPallete = utils.getColorPallete();

module.exports = {
  portugal :{
    maps: [
      { map: "textures/portugal.jpg" },
      // { normalMap: "textures/portugal_NRM.jpg" }
    ]
  },
  spain :{
    maps: [
      { map: "textures/spain.jpg" },
      // { normalMap: "textures/spain_NRM.jpg" }
    ]
  },
  france: {
    maps: [
      { map: "textures/france.jpg" },
      // { normalMap: "textures/leather/leather_NRM.jpg" }
    ]
  },
  unitedkingdom: {
    maps: [
      { map: "textures/unitedkingdom.jpg" },
      // { normalMap: "textures/leather/unitedkingdom_NRM.jpg" }
    ]
  },
  germany: {
    maps: [
      { map: "textures/germany.png" },
      // { normalMap: "textures/leather/unitedkingdom_NRM.jpg" }
    ],
    mapProps: {
      repeatScale: 1,
      shading: "flat"
    },
  },
  poland: {
    maps: [
      { map: "textures/poland.png" },
      // { normalMap: "textures/leather/unitedkingdom_NRM.jpg" }
    ],
    mapProps: {
      repeatScale: 1,
      shading: "flat"
    },
  },
  ireland: {
    maps: [
      { map: "textures/ireland.png" },
      // { normalMap: "textures/leather/unitedkingdom_NRM.jpg" }
    ],
    mapProps: {
      repeatScale: 1,
      shading: "flat"
    },
  },
  movieLight: {
    maps: [
      { map: "textures/3dAnimation/movieLight.png" },
    ],
    mapProps: { repeatScale: 1, shading: "flat" },
    props: {
      shadingType: "MeshBasicMaterial",
      color:"#FFFFFF",
      colorEmissive: "#FFFFFF",
      emissiveIntensity: 0.3,
     }
  }
};
