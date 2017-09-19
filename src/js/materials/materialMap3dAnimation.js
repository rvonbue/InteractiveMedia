// import utils from "../../util/utils";
// var colorPallete = utils.getColorPallete();

module.exports = {
  portugal :{
    props: {
      color: "#FF0000"
    }
  },
  spain :{
    props: {
      color: "#0000FF"
    }
  },
  redCarpet: {
    maps: [
      { map: "textures/3dAnimation/redCarpet.jpg" },
      // { specularMap: "textures/leather/leather_SPEC.jpg" },
      // { normalMap: "textures/leather/leather_NRM.jpg" }
    ],
    mapProps: {
      repeatScale: 5,
      shading: "flat"
    },
      // props: {color: "#FF0000" }
  },
  wallTan: {
    props: {
      shadingType: "MeshLambertMaterial",
      color: "#CCB68D"
    }
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
  },
  goldRedSeamless: {
    maps: [
      { map: "textures/3dAnimation/goldRedSeamless/goldRedSeamless.png" },
    ],
    mapProps: { repeatScale: 20, shading: "flat" },
    props: {
      shadingType: "MeshPhongMaterial",
     }

  }
};
