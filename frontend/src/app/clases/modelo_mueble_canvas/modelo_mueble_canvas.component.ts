import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-modelo_mueble_canvas',
  templateUrl: './modelo_mueble_canvas.component.html',
  styleUrls: ['./modelo_mueble_canvas.component.css']
})
export class Modelo_mueble_canvasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createThreeJsBox();
   }
  
   createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');

    const scene = new THREE.Scene();

    const material = new THREE.MeshToonMaterial();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1.5), 
      material
   );

   const torus = new THREE.Mesh(
      new THREE.TorusGeometry(5, 1.5, 16, 100),
      material
   );

   scene.add(torus, box);

   const canvasSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
   };

   const camera = new THREE.PerspectiveCamera(
    75,
    canvasSizes.width / canvasSizes.height,
    0.001,
    1000
   );
   camera.position.z = 30;
   scene.add(camera);

   if (!canvas) {
    return;
   }

   const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
   });
   renderer.setClearColor(0xe232222, 1);
   renderer.setSize(canvasSizes.width, canvasSizes.height);
  }
}


