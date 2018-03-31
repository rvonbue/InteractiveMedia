import TWEEN from "tween.js";
import eventController from "../controllers/eventController";
import commandController from "../controllers/commandController";
import utils from "../components/utils";

let MeshSelector = Backbone.Model.extend({
  defaults: {
    raycasterObjects: [],
  },
  initialize: function (options) {
    _.bindAll(this, "onMouseClick", "onMouseMove", "onMouseDown");
    this.lastRaycastObjectId = 1325435;
    this.canvasEl = $(options.canvasEl);
    this.camera = options.camera;
    this.raycasterOffset = { x: 1, y: 47 };  //ozzffset of canvas;
    this.mouse = new THREE.Vector2();
    this.addListeners();
    this.setRaycasterOptions();
    this.addSelectMesh();
  },
  setRaycasterOptions: function () {
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = 125;
    this.raycaster.near = 0.25;
  },
  triggerHoverNav: function () {
    eventController.trigger(eventController.HOVER_NAVIGATION, null);
  },
  addSelectMesh: function () {
    let geo = new THREE.OctahedronGeometry(0.25, 0);
    let material = new THREE.MeshBasicMaterial({ color: "#FF0000", wireframe: true });
    this.selectMesh = new THREE.Mesh( geo, material );
    this.selectMesh.position.set(-5, 0 , 0);
    eventController.trigger(eventController.ADD_MODEL_TO_SCENE, [this.selectMesh]);
  },
  onResize: function (size) {
    this.height = size.h;
    this.width = size.w;
    let canvasOffsetY = 0; //  this.canvasEl.offset().top);
    this.raycasterOffset = { x: 1, y: canvasOffsetY };
  },
  onMouseDown: function (evt) {
    this.clickStartPos = {x: evt.pageX | evt.clientX, y: evt.pageY | evt.clientY };
  },
  onMouseClick: function (evt) {
    let dragTolerance = 10;
    let x = evt.pageX | evt.clientX;
    let y = evt.pageY | evt.clientY;


    let xDiff = Math.abs(this.clickStartPos.x - x);
    let yDiff = Math.abs(this.clickStartPos.y - y);

    if ( xDiff > dragTolerance || yDiff > dragTolerance) return;

    let closestObject = this.shootRaycaster(evt);
    if ( closestObject ) eventController.trigger(eventController.MOUSE_CLICK_SELECT_OBJECT_3D, closestObject);
  },
  onMouseMove: function (evt) {
    evt.preventDefault();
    let raycastIntersect = this.shootRaycaster(evt);

    if ((raycastIntersect && this.lastRaycastObjectId === raycastIntersect.object.id)  // if nothing intersected
      || this.lastRaycastObjectId === 0 && !raycastIntersect ) {      // if intersected object is the same
      return;
    } else {
      this.lastRaycastObjectId = raycastIntersect ? raycastIntersect.object.id : 0;
      this.updateHoverMouseCursor(raycastIntersect);
      eventController.trigger(eventController.HOVER_NAVIGATION, raycastIntersect);
    }
  },
  updateHoverMouseCursor: function (raycastIntersect) {
    let hoveredBool = raycastIntersect ? true : false;
    this.canvasEl.toggleClass("hovered-3d", hoveredBool);
  },
  shootRaycaster: function (evt) { //shoots a ray at all the interactive objects
    this.mouse.x = ( (evt.clientX - this.raycasterOffset.x) / this.width ) * 2 - 1;
		this.mouse.y = - ( (evt.clientY - this.raycasterOffset.y ) / this.height ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    return this.findClosestObject(this.raycaster.intersectObjects( this.get("raycasterObjects") ));
  },
  findClosestObject: function (intersects) {
    let closestObject = null;
    _.each(intersects, function (inter, i ) {
      if (i === 0) {
        closestObject = inter;
      } else if (inter.distance < closestObject.distance){
        closestObject = inter;
      }
    });
    return closestObject;
  },
  getMaterialArray: function () {
    let urls = this.getUrls();
  	let materialArray = [];

  	for (let i = 0; i < 6; i++)
  		materialArray.push( new THREE.MeshBasicMaterial({
  			map: new THREE.TextureLoader().load( urls[i] ),
  			side: THREE.BackSide
		  })
    );

    return materialArray;
  },
  resetRaycaster: function (arr) {
    this.set("raycasterObjects", arr);
    console.log("arr", arr);
  },
  cancelSelectMeshTimer: function () {

    if (this.selectMeshTimer) {
      clearTimeout(this.selectMeshTimer);
      this.selectMeshTimer = null;
    }

  },
  getCountryMesh: function (names) {
    let meshes = [];

    names.forEach( (name)=> {
      meshes.push(_.findWhere(this.get("raycasterObjects"), {name: name}));
    });

    let x =0, y = 0,z = 0;

    meshes.forEach((mesh)=> {
      let meshcenter = this.getMeshCenter(mesh);
      console.log(", meshesCenter.y, meshesCenter.z)", meshcenter);
      x += meshcenter.x,
      y += meshcenter.y;
      z += meshcenter.z;

    }, this);

    let meshesCenter = { x: x / meshes.length, y: y / meshes.length, z: z / meshes.length };
    this.selectMesh.position.x = meshesCenter.x;

    return meshesCenter;
  },
  getMeshCenter: function (selectedMesh) {
    let center = selectedMesh.geometry.boundingSphere.center;

    return {
      x: selectedMesh.position.x + center.x,
      y: selectedMesh.position.y + center.y,
      z: selectedMesh.position.z + center.z + 0.5 // TODO: magic number should be move along angle to camera
    };
  },
  moveSceneDetailsIconSimple: function (pos) {
      this.selectMesh.position.set(pos.x, pos.y, pos.z);
  },
  moveSceneDetailsIcon: function (selectedMesh) {
    this.cancelSelectMeshTimer();

    if (!selectedMesh) {
      let self = this;
      this.selectMeshTimer = setTimeout( function () {
        self.selectMesh.visible = false;
      }, 1000);
      return;
    }
    this.selectMesh.visible = true;

    let endPosition = this.getMeshCenter(selectedMesh);
    endPosition.y += 0.5;
    let tweenMove = new TWEEN.Tween(this.selectMesh.position)
    .to(endPosition, 500)
    .easing(TWEEN.Easing.Exponential.Out)
    .start();

    let tweenRotate = new TWEEN.Tween(this.selectMesh.rotation)
    .to({x: "+6.28319", y: "+6.28319", z: "+6.28319" }, 750)  //6.28319 = 260 degrees
    .easing(TWEEN.Easing.Exponential.In)
    // .delay(250)
    .start();

  },
  addListeners: function () {
    this.throttledMouseMove = _.throttle(this.onMouseMove, 25);
    this.canvasEl.on("mousemove", this.throttledMouseMove);
    this.canvasEl.on("mouseleave", this.triggerHoverNav);
    this.canvasEl.on("mouseup", this.onMouseClick);
    this.canvasEl.on("mousedown", this.onMouseDown);

    eventController.on(eventController.ON_RESIZE, this.onResize, this);
    eventController.on(eventController.RESET_RAYCASTER, this.resetRaycaster, this);
    eventController.on(eventController.ANIMATE_CAMERA, this.moveSceneDetailsIconSimple, this);
    commandController.reply(commandController.GET_COUNTRY_MESH, this.getCountryMesh, this);
  },
  render: function () {
    return this;
  }
});
module.exports = MeshSelector;
