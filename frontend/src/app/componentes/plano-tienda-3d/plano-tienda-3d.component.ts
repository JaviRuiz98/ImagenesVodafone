import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-plano-tienda-3d',
  templateUrl: './plano-tienda-3d.component.html',
  styleUrls: ['./plano-tienda-3d.component.css']
})
export class PlanoTienda3DComponent implements OnInit, AfterViewInit {
  @ViewChild('container') elementRef: ElementRef;
  private container: HTMLElement;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initThree();
  }

  private initThree(): void {
    this.container = this.elementRef.nativeElement;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.container.appendChild(this.renderer.domElement);

    // Aquí puedes empezar a añadir tus objetos 3D, luces, etc.
    // Por ejemplo, añadir un cubo simple:
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.camera.position.z = 5;

    this.animate();

    // Cargar el modelo 3D
    const loader = new GLTFLoader();
    loader.load('assets/3d_models/modelo2.glb', function(gltf) {
      gltf.scene.scale.set(0.5, 0.5, 0.5); // Ajusta la escala si es necesario
      gltf.scene.position.set(0, 0, 0); // Ajusta la posición si es necesario
      this.scene.add(gltf.scene);
    }.bind(this), undefined, function(error) {
      console.error(error);
    });  

    const light = new THREE.AmbientLight(0x404040); // Luz suave
    this.scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Luz más intensa
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);

  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    // Actualizar lógica de la escena, como la rotación del cubo
    this.renderer.render(this.scene, this.camera);
  }
}
