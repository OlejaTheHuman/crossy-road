import * as THREE from 'three';
import PhysicGeometry from '../geometry/physicGeometry.ts';
import Config from '../config.ts';

export default class Character extends PhysicGeometry {
    private _isAnimationGoing = false;
    private _isSqueezing = false;

    constructor() {
        super(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: '#6273bf'}));
        this.setAcceleration({x: 0, y: 0, z: Config.G_ACCELERATION});
    }

    public animate(): void {
        this._squeeze();
        if (this._isAnimationGoing) super.animate();

        if (this.mesh.position.z <= 1) {
            this.setVelocity({x: 0, y: 0, z: 0});
            this.mesh.position.z = 1;
            this._isAnimationGoing = false;
        }
    }

    public goForward(): void {
        if (this._isAnimationGoing) return;
        this._isAnimationGoing = true;
        this._isSqueezing = false;
        this.velocityZ += Config.CHARACTER_Z_VELOCITY;
        this.velocityY += Config.CHARACTER_Y_VELOCITY;
    }

    public goBack(): void {
        if (this._isAnimationGoing) return;
        this._isAnimationGoing = true;
        this._isSqueezing = false;
        this.velocityZ += Config.CHARACTER_Z_VELOCITY;
        this.velocityY -= Config.CHARACTER_Y_VELOCITY;
    }

    public goLeft(): void {
        if (this._isAnimationGoing) return;
        this._isAnimationGoing = true;
        this._isSqueezing = false;
        this.velocityZ += Config.CHARACTER_Z_VELOCITY;
        this.velocityX -= Config.CHARACTER_X_VELOCITY;
    }

    public goRight(): void {
        if (this._isAnimationGoing) return;
        this._isAnimationGoing = true;
        this._isSqueezing = false;
        this.velocityZ += Config.CHARACTER_Z_VELOCITY;
        this.velocityX += Config.CHARACTER_X_VELOCITY;
    }

    private _squeeze(): void {
        if (!this._isSqueezing) {
            this.mesh.scale.z = 1;

            return;
        }
        if (this.mesh.scale.z > 1 || this.mesh.scale.z < 0.5) return;
        const scaleFactor = Config.G_ACCELERATION * this.mesh.scale.z**2 * 0.2;
        this.mesh.scale.z += scaleFactor;
    }

    public squeeze(): void {
        this._isSqueezing = true;
    }
}