// import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController"
import utils from "../components/utils";
import TWEEN from "tween.js";
let colorPallete = utils.getColorPallete();

let SceneModel = Backbone.Model.extend({
  defaults: {
    "name": "Caesar_Salad",
    "mesh3d": null,
    "text3d": null,  // mesh
    "selected": false,
    "hover": false,
    "loading": false,
    "ready": false,
    "interactive": true,
    "animating": false,
    "power": null,
    "invaded": false,
    "centerPosition": null
  },
  initialize: function( options ) {
    this.addModelListeners();
  },
  addModelListeners: function () {
    this.on("change:selected", this.onChangeSelected);
    this.on("change:hover", this.onChangeHover);
    let self = this;
    this.once("change:mesh3d", ()=> {
        self.set("initPos", _.clone(self.get("mesh3d").position));
    });
  },
  removeModelListeners: function () {
    this.off("change:selected", this.onChangeSelected);
    this.off("change:hover", this.onChangeHover);
  },
  onChangeHover: function () {
    if ( this.get("selected") === true || this.get("animating" === true)) return;
    if (this.get("hover") === true ) {
      this.highlightMaterial();
    } else {
      this.unhighlightMaterial();
    }

    this.getTween(
      this.getMesh3d().position,
      { y: this.get("initPos").y + this.get("hover") ? 0.05 : 0 }
    )
    .start();
  },
  onChangeSelected: function () {
    // if (this.get("hover")) return;
    if ( this.get("selected") ) {
      this.highlightMaterial();
    } else {
      this.unhighlightMaterial();
    }
  },
  resetImageTexture: function (context) {
    context.fillStyle = colorPallete.countryMap;
    context.fillRect(0,0,512,512);
    context.drawImage(this.getBorderImage(), 0, 0);
    this.updateTextureMap();
  },
  animateInvasion: function () {
    let self = this;
    let borderImage = this.getBorderImage();
    let canvas = document.createElement( 'canvas' );
        canvas.width = borderImage.width;
        canvas.height = borderImage.height;
    let context = canvas.getContext( '2d' );

    this.get("mesh3d").material.map = new THREE.Texture(canvas);
    this.get("mesh3d").material.map.borderImage = borderImage;

    this.resetImageTexture(context);
    context.fillStyle = colorPallete.axis;

    new TWEEN.Tween(0)
      .easing(TWEEN.Easing.Quadratic.Out)
      .interpolation(TWEEN.Interpolation.Bezier)
      .to(1, 1500)
      .onUpdate(function (val) {
        _.each( self.get('invasionDirection'), (direction)=> {
          self.drawInvasionDirection(direction, context, canvas.width, val);
        });

        context.drawImage(self.getBorderImage(), 0,0);
        self.updateTextureMap();
      })
      .start();
  },
  drawInvasionDirection: function (direction, context, canvasWidth, val) {
    switch(direction) {
      case "ltr":
        context.arc(0, canvasWidth / 2, canvasWidth * val, 0, 2 * Math.PI, false);
        context.fill();
        break;
      case "rtl":
        context.arc(canvasWidth, canvasWidth / 2, canvasWidth * val, 0, 2 * Math.PI, false);
        context.fill();
        break;
      case "btt": //bottom to Top
        context.arc(canvasWidth / 2, canvasWidth , canvasWidth * val, 0, 2 * Math.PI, false);
        context.fill();
        break;
      case "ttb": //bottom to Top
        context.arc(canvasWidth / 2, 0 , canvasWidth * val, 0, 2 * Math.PI, false);
        context.fill();
        break;
      case "mid":
        context.arc(canvasWidth / 2, canvasWidth / 2 , canvasWidth * val, 0, 2 * Math.PI, false);
        context.fill();
        break;
      }
  },
  drawFlagBackground: function () {
    let canvas = this.getTextureCanvas();
    let context = canvas.getContext( '2d' );

    context.fillStyle = colorPallete.countryMap;
    context.fillRect(0,0,canvas.width, canvas.height);

    let sprite = commandController.request(commandController.GET_IMAGE_SPRITE, this.get("name"), this);
    let spritePos = {x: sprite.size.w / 2, y: sprite.size.h / 2 };
    let canvasCenter = {x: canvas.width / 2, y: canvas.height / 2 };
    let centerPoint = {x: canvasCenter.x - spritePos.x, y: canvasCenter.y - spritePos.y};
    let newPos = {x:128, y:128};


    context.drawImage(sprite.imageObj, sprite.pos.x, sprite.pos.y, sprite.size.w, sprite.size.h, newPos.x * 2 - spritePos.x, newPos.y * 2 - spritePos.y, sprite.size.w, sprite.size.h);
    context.drawImage(this.getBorderImage(), 0,0);

    this.updateTextureMap();

  },
  getMesh3d: function () {
    return this.get("mesh3d");
  },
  getHighlightColor: function () {

    if (this.get("invaded")) {
      return colorPallete.axis;
    } else {
      return this.get("power") === 0 ? colorPallete.axis : colorPallete.ally;
    }
  },
  getTween: function (to, from) {
    let self = this;
    self.set("animating", true);
    return new TWEEN.Tween(to)
      .easing(TWEEN.Easing.Circular.Out)
      .interpolation(TWEEN.Interpolation.Bezier)
      .to(from, 500)
      .onComplete(function () {
        self.set("animating", false);
      });
  },
  getBorderImage: function () {
    return this.get("mesh3d").material.map.borderImage;
  },
  getTextureCanvas: function () {
    return this.get("mesh3d").material.map.image;
  },
  getCanvasContext: function () {
    return this.getTextureCanvas().getContext( '2d' );
  },
  updateTextureMap: function () {
    this.get("mesh3d").material.map.needsUpdate = true;
  },
  unhighlightMaterial: function () {
    let context = this.getCanvasContext();
    context.fillStyle = colorPallete.countryMap;
    context.fillRect(0,0,512,512);
    this.updateTextureMap();
    context.drawImage(this.getBorderImage(), 0,0);
  },
  highlightMaterial: function () {
    let context = this.getCanvasContext();
    let highlightcolor = this.getHighlightColor();
    context.fillStyle = highlightcolor;
    context.fillRect(0,0,512,512);

    // this.createNoise(context, highlightcolor);
    this.updateTextureMap();
    // this.drawFlagBackground();
    // context.globalCompositeOperation = "destination-in";
    context.drawImage(this.getBorderImage(), 0,0);
    // context.globalCompositeOperation = "source-over";
  },
  reset: function (showHideBool) {
    this.set("selected", false);
    this.set("hover", false);
  },
  isReady: function () {
    return this.get("ready") && !this.get("loading");
  },
  showHide: function () { // show = true

  },
  hide: function () {
      // console.log("asdfasdf", this.get("mesh3d").material.opacity = 0.25);
  },
  createNoise: function (ctx, color) {
    let idata = ctx.createImageData(512, 512); // create image data
    let buffer32 = new Uint8Array(idata.data.buffer);
    let len = buffer32.length - 1;
    let countryColor = this.getHexadecimalColor(colorPallete.countryMap);
    console.log("color:", color);
    let powerColor = this.getHexadecimalColor(color);

    for (var y = 0; y < 512; ++y) {
      for (var x = 0; x < 512; ++x) {
        var offset = 4 * (y * 512 + x);
        let random = Math.random();
        // light blue (#80d7ff)
        buffer32[offset+0] = random < 0.5 ? powerColor[0] : countryColor[0];  // red
        buffer32[offset+1] = random < 0.5 ? powerColor[1] : countryColor[1];  // green
        buffer32[offset+2] = random < 0.5 ? powerColor[2] : countryColor[2]; // blue
        buffer32[offset+3] = 0xff; // alpha
      }
    }
    ctx.putImageData(idata, 0, 0);
  },
  getHexadecimalColor: function (color) {
    return [
      parseInt(`0x${color[1]}${color[2]}`),
      parseInt(`0x${color[3]}${color[4]}`),
      parseInt(`0x${color[5]}${color[6]}`)
    ];
  },
  getZoomPoint: function () {
    let mesh3d = this.get("mesh3d");
    return utils.getMeshCenterRadius(_.clone(mesh3d.position), _.clone(mesh3d.geometry.boundingSphere));
  },
  getSize: function (mesh) {
    mesh = mesh ? mesh : this.get("mesh3d");
    let bb = mesh.geometry.boundingBox;
    return {
      w: Math.abs(bb.max.x) + Math.abs(bb.min.x),
      h: Math.abs(bb.max.y) + Math.abs(bb.min.y),
      l: Math.abs(bb.max.z) + Math.abs(bb.min.z)
    };
  },
  setFadeInMaterial:function (mat) {
      mat.opacity = 0;
      mat.transparent = true;
  },
  setFadeOutMaterial: function (mat) {
      mat.transparent = true;
      mat.opacity = 1;
  },
  fadeMaterials: function (opacityEnd, materials) {
    let allMaterials = materials ? materials : this.getAllMaterials();

    allMaterials.forEach(function (mat) {
      this.fadeMaterial(mat, opacityEnd, utils.getAnimationSpeed().materialsFade);
    }, this);

  },
  fadeMaterial: function (mat, opacityEnd, tweenSpeed) {
    let newOpacityEnd = mat.opacityMax ? mat.opacityMax : opacityEnd;
    newOpacityEnd === 0 ? this.setFadeOutMaterial(mat) : this.setFadeInMaterial(mat);

    let tween = new TWEEN.Tween(mat)
        .easing(TWEEN.Easing.Circular.Out)
        .interpolation(TWEEN.Interpolation.Bezier)
        .to({ opacity: newOpacityEnd }, tweenSpeed)
        .onComplete(function () {
          if ( opacityEnd === 1  && !mat.alwaysTransparent ) {
            mat.transparent = false;
          } else if (opacityEnd === 0) {
            // self.set({ selected: false });
          }
        })
        .start();
  },
});

module.exports = SceneModel;
