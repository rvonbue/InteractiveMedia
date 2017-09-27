import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController"
import materialMapList from "../materials/combinedMaterials";
import utils from "../components/utils";
let color = utils.getColorPallete();
// import countryBordersBase64 from "../data/countryBordersBase64.json";
// console.log("asdfasjljdfs", countryBordersBase64);

var MaterialLibrary = Backbone.Model.extend({
  initialize: function () {
    this.materialCollection = [];
  },
  getMaterial: function (oldMat) {
    var matFromLib = this.doesMaterialExist(oldMat);
    var newMaterial;

    if ( !matFromLib ) { // if material doesn't exist
      matFromLib = this.makeNewMaterial(oldMat);
      this.materialCollection.push(matFromLib);
      newMaterial =  matFromLib;
    } else {
      newMaterial = matFromLib;
    }
    this.setMaterialProperties(newMaterial);

    return newMaterial;
  },
  makeNewMaterial: function (mat) {
    var matmaplist = materialMapList[mat.name];
    var hasProps = matmaplist && matmaplist.props;
    var hasShadingType = hasProps && matmaplist.props.shadingType ? true : false;
    var shadingType = hasShadingType ? matmaplist.props.shadingType : false;


    if ( hasShadingType ) {
      return new THREE[shadingType]({ name: mat.name, side: THREE.FrontSide });
    } else {
      mat.side = THREE.FrontSide;
      return mat;
    }

  },
  setMaterialProperties: function (mat) {
    if (!materialMapList[mat.name]) return;

    var self = this;
    var materialObj = materialMapList[mat.name];

    _.each(materialObj, function (value, key) {
      if (key === "maps") {
        _.each(value, function (mapObj) {
          self.setNewTexture(mapObj, mat, materialObj.mapProps);
        });
      }

      if (key === "props") {
        self.setMaterialAttributes(mat, value);
      }

    });
  },
  setNewTexture: function (mapObj, mat, options) {
    var texture = null;

    _.each(mapObj, function (mapURL, mapKey) {
        mat[mapKey] = this.getImageTexture(mapURL, options);
    }, this);
  },
  getImageTexture: function (mapURL, options) {
    let loader = new THREE.ImageLoader();
    let canvas = document.createElement( 'canvas' );
  	let context = canvas.getContext( '2d' );
    let texture = new THREE.Texture(canvas);


    loader.load(
    	mapURL,
    	function ( image ) {
        canvas.width  = image.width;
        canvas.height = image.height;
        context.fillStyle = color.countryMap;
        context.fillRect(0,0,512,512);
    		context.drawImage( image, 0, 0 );
        texture.needsUpdate = true;
        texture.borderImage = image;
    	}
    );
    if (options && options.repeatScale) {
        texture.repeat.set( options.repeatScale, options.repeatScale );
        texture.shading = options.shading === "smooth" ? THREE.FlatShading : THREE.FlatShading ;
      }
    return texture;
  },
  setMaterialAttributes: function (mat, props) {
    // console.log("mat:", mat);
    _.each(props, function (p,k) {
      if (k === "color" || k === "emissive" || k === "specular" ) {
        mat[k] = new THREE.Color(p);
      } else {
        mat[k] = p; // set all other attributes by key and property
      }
    }, this);
  },
  doesMaterialExist: function (oldMat) {
    var newMaterial = false;
    var matInCollection = this.materialCollection[oldMat.name];

    if (matInCollection) newMaterial = matInCollection;

    return newMaterial;
  },
  loadMaterial: function (imgSrc, options) {
    var material;
    if ( options && options.meshType === 'basic') {
      material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader(this.get("manager")).load( imgSrc )
      });
    } else {
      material = new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader(this.get("manager")).load( imgSrc )
      });
    }
    return material;
  }
});

module.exports = MaterialLibrary;
