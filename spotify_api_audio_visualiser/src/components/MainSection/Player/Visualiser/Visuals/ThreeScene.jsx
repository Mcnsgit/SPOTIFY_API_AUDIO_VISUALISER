import React, { Component } from "react";
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeScene extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.scene = new THREE.Scene();

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 0;
    this.camera.position.y = 2;

    //Camera Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    //LIGHTS
    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    //Simple Box with WireFrame
    this.sphereArray = [];
    this.renderSpheres(this.props.cubesNumber)
    this.currentCubeScale = 0;
    this.cubeScale = 0;
    this.prevLoudness = 0;
    this.prevCubeScale = 0;
    this.moderate = 0;

    this.renderScene();
    //start animation
    this.start();
  }

  renderSpheres(spheresNumber) {
    // var incrementalAngle = 0.0;
    var incrementDistance = 50; 
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({
      color: "#ffffff"
    });
    // for (var i = 0; i < spheresNumber; i++) {
    //     this.cube = new THREE.Mesh(geometry, material);
    //     this.cube.position.x = 50 * Math.cos(incrementalAngle);
    //     this.cube.position.z = 50 * Math.sin(incrementalAngle);
    //     this.sphereArray.push(this.cube);
    //     this.scene.add(this.cube);
    //     incrementalAngle += (2 * Math.PI) / spheresNumber;  
    // }
    for (var i = 0; i < spheresNumber; i++) {
      this.cube = new THREE.Mesh(geometry, material);
      this.cube.position.y = -5 - (incrementDistance * i);
      this.sphereArray.push(this.cube);
      this.scene.add(this.cube);
      // incrementalAngle +;  
  }
    // this.scene.add(this.sphereArray);
  }

  mapValues(value, x1, y1, x2, y2) {
    return (value - x1) * (y2 - x2) / (y1 - x1) + x2
  }

  lerp(value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
  }


  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    if (this.props.currentLoudness > -12) {
      this.currentCubeScale = this.mapValues(this.props.currentLoudness - this.prevLoudness, -2, 2, 1, 20);
    }
    if (this.props.currentLoudness - this.prevLoudness > 0) {
      this.moderate = 1; 
    }
    if (this.moderate > 0) {
      this.cubeScale = this.lerp(this.cubeScale, this.currentCubeScale, 0.03);
    }
    else{
      this.cubeScale = this.lerp(this.cubeScale, 0, 0.007);
    }
    this.moderate-=0.06;
    this.prevLoudness = this.props.currentLoudness;
    this.prevCubeScale = this.currentCubeScale;
    for (var i = 0; i < this.sphereArray.length; i++) {
        // this.sphereArray[i].scale.x = this.cubeScale;
        // this.sphereArray[i].scale.y = this.cubeScale;
        // this.sphereArray[i].scale.z = this.cubeScale;
    }
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: this.props.screenWidth, height: this.props.screenHeight }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeScene;