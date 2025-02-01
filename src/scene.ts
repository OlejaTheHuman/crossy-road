import * as THREE from 'three';
import {Light} from 'three';
import {BasicGeometry} from './geometry/basicGeometry';
import * as dat from 'lil-gui';
import {AnimatableI} from './geometry/physicGeometry.ts';

export const isAnimatable = (obj: unknown): obj is AnimatableI => (obj as AnimatableI)?.animate !== undefined;

export class Scene {
    private _target: HTMLElement;
    private _objects: BasicGeometry[] = [];
    private _lights: Light[] = [];
    private readonly _width: number;
    private readonly _height: number;

    constructor(
        target: HTMLElement,
        private scene = new THREE.Scene(),
        private camera = new THREE.OrthographicCamera(-1 * window.innerWidth / window.innerHeight, window.innerWidth / window.innerHeight, 1, -1, -1000, 1000),
        private renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        }),
    ) {
        this._target = target;
        this._width = this._target.offsetWidth;
        this._height = this._target.offsetHeight;
        this.renderer.setPixelRatio(2);
    }

    public initScene() {
        this.configureCamera();

        this.renderer.setSize(this._width, this._height);
        this._target?.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => this.handleResize());

        for (const mesh of this._objects) {
            this.scene.add(mesh.mesh);
        }

        for (const light of this._lights) {
            this.scene.add(light);
        }

        this.renderer.render(this.scene, this.camera);
    }

    public addObject(object: BasicGeometry): void {
        this._objects.push(object);
    }

    public addLight(light: Light): void {
        this._lights.push(light);
    }

    public getObjects(): BasicGeometry[] {
        return this._objects;
    }

    public renderFrame(): void {
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }

    private handleResize() {
        const width = this._target.offsetWidth;
        const height = this._target.offsetHeight;

        this.renderer.setSize(width, height);
        //TODO доделать, чтобы сцена не искажалась
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
