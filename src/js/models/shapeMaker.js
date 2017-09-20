// import eventController from "../controllers/eventController";
import utils from "../components/utils";
import TWEEN from "tween.js";
import { Color } from "three";
import loadSvg from 'load-svg';
let parsePath = require('extract-svg-path').parse
import svgMesh3d from 'svg-mesh-3d';
import THREE from "three";
let createGeometry = require('three-simplicial-complex')(THREE);
var parse = require('parse-svg-path')
var translate = require('translate-svg-path')
import getMesh from "./d3three";

var ShapeMaker = Backbone.Model.extend({
  defaults: {
    "name": "shapeMaker",
    },
  initialize: function( options ) {
    this.importsvg();
  },
  drawShape: function(pathArray) {
      var shape = new THREE.Shape();
      pathArray.forEach(( path, i ) => {
        if (path[0] == "m" || path[0] == "M") shape.moveTo( path[1], path[2]);
        if (path[0] == "c" || path[0] == "C") shape.bezierCurveTo( path[1], path[2], path[3], path[4], path[5], path[6] );
        if (path[0] == "z") shape.closePath();
      });

      return shape;
  },
  importsvg: function () {
    let mesh = "";
    let self = this;
    loadSvg('textures/svg/russia.svg', function (err, svg) {
      if (err) throw err

      let svgPath = parsePath(svg)
      mesh = svgMesh3d(svgPath, {
        delaunay: false,
        scale: 1
      });
      
      console.log("svgPath-----------", getMesh(svgPath));

      // let shape = self.drawShape(svgPath);
      // console.log("svgsvgsvgsvgsvg", svg);


      // var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
      // var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
      // var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );


      // var path = parse(svgPath);
      // var x = translate(path, 20)
      // var xy = translate(path, 20, 10)
      // console.log("x-----------", path);
      // console.log("xy-----------", xy);
    //   let geometry = createGeometry(mesh);
    //   let material = new THREE.MeshBasicMaterial({
    //     wireframe: false
    //   });
    //
    //   // let extgeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    //   let mesh = new THREE.Mesh(geometry, material);
      // eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [mesh]);
    //   console.log("geometry", mesh);
    });

  }
});

module.exports = ShapeMaker;
