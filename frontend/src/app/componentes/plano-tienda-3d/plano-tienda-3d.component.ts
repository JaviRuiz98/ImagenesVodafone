import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

@Component({
  selector: 'app-plano-tienda-3d',
  templateUrl: './plano-tienda-3d.component.html',
  styleUrls: ['./plano-tienda-3d.component.css']
})
export class PlanoTienda3DComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  scene: THREE.Scene;
  loaderGLTF: GLTFLoader;
  model: THREE.Object3D;

  constructor() {
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.createScene();
  }
  
  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd4d4d8);

    this.loaderGLTF = new GLTFLoader();

    this.loaderGLTF.load('assets/3d_models/modelo2.glb', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    }, undefined, function (error) {
      console.error(error);
    });

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement,
      alpha: true // set to transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(16, 20, 5); 

    //Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(this.scene, camera);
    }

    animate();
  }
}
