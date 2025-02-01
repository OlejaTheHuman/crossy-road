import * as THREE from 'three';
import Character from '../gameObjects/character.ts';
import {Collision} from '../collisions/collisions.ts';
import {GroundLine} from '../gameObjects/groundLine.ts';
import KeyboardControls from '../controls/keyboardControls.ts';
import {isAnimatable, Scene} from '../scene.ts';
import {Ground} from '../gameObjects/Ground.ts';

export class Game {
    private _scene: Scene;
    private _collision: Collision;
    private _isRunning = false;
    private readonly _character: Character;

    constructor(container: HTMLElement) {
        this._scene = new Scene(container);
        this._collision = new Collision();

        this._character = new Character();
        this._character.position(1, 1, 1);
        const ground = new Ground(200, 200, 1);

        this._scene.addObject(this._character);
        this._scene.addObject(ground);
        this._collision.addObject(this._character);
        this._collision.addObject(ground);

        this.createGround(100);
        this.addLights();

        this._scene.initScene();
        this.initControls();
    }

    public start() {
        this._isRunning = true;
        this.loop();
    }

    public stop() {
        this._isRunning = false;
    }

    private loop() {
        if (!this._isRunning) return;

        this.checkCollisions();

        for (const obj of this._scene.getObjects()) {
            if (isAnimatable(obj)) obj.animate();
        }

        this._scene.renderFrame();

        requestAnimationFrame(() => this.loop());
    }

    private createGround(count: number) {
        for (let i = 0; i < count; i++) {
            const color = (i % 2 === 0) ? '#67ec91' : '#4bc975';
            const line = new GroundLine(new THREE.MeshStandardMaterial({ color }));
            line.position(0, i, 0);

            this._scene.addObject(line);
        }
    }


    private addLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 30);
        this._scene.addLight(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x404040, 10);
        directionalLight.position.set(1, 1, 2);
        this._scene.addLight(directionalLight);
    }

    private initControls() {
        const keyupControls = new KeyboardControls('keyup');
        const keydownControls = new KeyboardControls('keydown');

        keyupControls.addEventHandler({ key: 'w', handler: () => this._character.goForward() });
        keyupControls.addEventHandler({ key: 's', handler: () => this._character.goBack() });
        keyupControls.addEventHandler({ key: 'a', handler: () => this._character.goLeft() });
        keyupControls.addEventHandler({ key: 'd', handler: () => this._character.goRight() });

        keydownControls.addEventHandler({ key: 'w', handler: () => this._character.squeeze() });
        keydownControls.addEventHandler({ key: 's', handler: () => this._character.squeeze() });
        keydownControls.addEventHandler({ key: 'a', handler: () => this._character.squeeze() });
        keydownControls.addEventHandler({ key: 'd', handler: () => this._character.squeeze() });
    }

    public checkCollisions() {
        const collided = this._collision.checkCollisions(this._character);

        for (const obj of collided) {
            if (obj instanceof Ground) {
                this._character.fixCharacterOnGround();
            }
        }
    }
}