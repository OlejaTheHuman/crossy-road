import * as THREE from 'three';
import { Light } from 'three';
import { BasicGeometry } from './geometry/basicGeometry';
import * as dat from 'lil-gui';


export class Scene {
    private _target: HTMLElement;
    private readonly _width: number;
    private readonly _height: number;
    private _objects: BasicGeometry[] = [];
    private _lights: Light[] = [];

    constructor(
        target: HTMLElement,
        private scene = new THREE.Scene(),
        private camera = new THREE.OrthographicCamera(-1 * window.innerWidth / window.innerHeight, window.innerWidth / window.innerHeight, 1, -1, -1000, 1000),
        private renderer = new THREE.WebGLRenderer({alpha: true}),
    ) {
        this._target = target;
        this._width = this._target.offsetWidth;
        this._height = this._target.offsetHeight;
    }

    public initScene() {
        this.configureCamera();

        this.renderer.setSize(this._width, this._height);
        this._target?.appendChild(this.renderer.domElement);

        for (const mesh of this._objects) {
            this.scene.add(mesh.mesh);
        }

        for (const light of this._lights) {
            this.scene.add(light);
        }

        this.renderer.render(this.scene, this.camera);
        this.animate();
    }

    public addObject(geometry: BasicGeometry): void {
        this._objects.push(geometry);
    }

    public addLight(light: Light): void {
        this._lights.push(light);
    }

    private animate(): void {
        requestAnimationFrame(() => this.animate());
        this.camera.updateProjectionMatrix();
        //
        // for(const mesh of this._objects){
        //     mesh?.animate();
        // }

        this.renderer.render(this.scene, this.camera);
    }

    private configureCamera(): void {
        this.camera.rotation.x = 0.714;
        this.camera.rotation.y = 0.19;
        this.camera.rotation.z = 0.19;
        this.camera.zoom = 0.15;
        this.camera.position.y = 10;
        this.camera.position.z = 0;
        this.camera.position.x = 0;

        const gui = new dat.GUI();
        gui.add(this.camera.rotation, 'x', -3, 3, 0.001);
        gui.add(this.camera.rotation, 'y', -3, 3, 0.001);
        gui.add(this.camera.rotation, 'z', -3, 3, 0.001);
        gui.add(this.camera.position, 'x', -15, 15, 1);
        gui.add(this.camera.position, 'y', 0, 100, 1);
        gui.add(this.camera.position, 'z', -15, 15, 1);
        gui.add(this.camera, 'zoom', 0, 1, 0.001);
    }
}
