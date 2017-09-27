module.exports = {
  size: { width: null, height: null },
  getAnimationSpeed: function () {
    return { materialsFade: 500, cameraMove: 1500, speed: 1000, lightOut: 3000 };
  },
  translateWidthHeight: function(w, h) {
    return { width: w  / this.worldScale, height: h / this.worldScale };
  },
  getFontColor: function () {
    return { text: "#062f4f" };
  },
  getMeshWidthHeight: function (bounding) {
    return {
      width:  Math.abs(bounding.min.x) + Math.abs(bounding.max.x),
      height: Math.abs(bounding.min.y) + Math.abs(bounding.max.y),
      depth:  Math.abs(bounding.min.z) + Math.abs(bounding.max.z)
    };
  },
  getMeshCenterRadius: function (pos, bounding) {
    let center = _.clone(bounding.center);
    let newPos = {
      x: pos.x + center.x,
      y: pos.y + center.y,
      z: pos.z + center.z
    }
    center.y += bounding.radius;
    return newPos;
  },
  getWorldLighting: function () {
    return {
      background: {
        cssSkyGradient: 5 // 0 - 23 is valid
      },
      hemisphere: {
        sky:"#9be2fe",
        ground: "#FFFFFF",
        intensity: 0

      },
      directional: {
        color: "#FFFFFF",
        intensity: 0.5, //0.3
        position: {x: 0, y: 10, z: 5}
      }
    };
  },
  getColorPallete: function () {
    return {
      axis: "#0000FF",
      ally: "#FF0000",
      countryMap: "#708090"
    };
  }
};
